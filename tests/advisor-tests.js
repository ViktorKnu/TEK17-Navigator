const path = require("node:path");

global.window = global;

const root = path.resolve(__dirname, "..");

require(path.join(root, "src/domain/data/legalReferences.js"));
require(path.join(root, "src/features/advisor/advisorSources.js"));
require(path.join(root, "src/features/advisor/retrieval.js"));
require(path.join(root, "src/features/advisor/answerBuilder.js"));
require(path.join(root, "src/features/advisor/localLlmClient.js"));
require(path.join(root, "src/features/advisor/advisor.js"));

const data = global.TEK17Data;
const advisor = global.TEK17Advisor;
advisor.localLlmConfig.enabled = false;
const checks = [];

function expectIncludes(label, actual, expected) {
  checks.push({ label, actual, expected, ok: actual.includes(expected) });
}

(async () => {
  expectIncludes(
    "TEK17-spørsmål henter grunnkilde",
    await advisor.answerQuestion("Hva er TEK17?", data.legalReferences),
    "byggteknisk forskrift",
  );
  expectIncludes(
    "Risikoklasse-spørsmål henter RKL-kilde",
    await advisor.answerQuestion("Hva avgjør risikoklasse for hotell?", data.legalReferences),
    "Risikoklasse",
  );
  expectIncludes(
    "Risikoklasse-spørsmål henter veiledning",
    await advisor.answerQuestion("Hva avgjør risikoklasse for hotell?", data.legalReferences),
    "Veiledning til TEK17 § 11-2",
  );
  expectIncludes(
    "BKL 4-spørsmål henter unntak/analyse-kilde",
    await advisor.answerQuestion("Når får et bygg BKL 4?", data.legalReferences),
    "Unntak og BKL 4",
  );
  expectIncludes(
    "Problemstilling viser preakseptert spor",
    await advisor.answerQuestion("Problemstilling: Kan et hotell i to etasjer vurderes etter preakseptert brannklasse?", data.legalReferences),
    "Preakseptert spor",
  );
  expectIncludes(
    "Konkrete VTEK-punkter følger kildesvaret",
    await advisor.answerQuestion("Hva er brannklasse for RKL 6 i tre etasjer?", data.legalReferences),
    "RKL 6 gir BKL 1 i én etasje, BKL 2 i to til fire etasjer",
  );
  expectIncludes(
    "Oppfølgingsspørsmål bruker tidligere samtalekontekst",
    await advisor.answerQuestion("Gjelder den også her?", data.legalReferences, {
      previousQuestions: ["Kan et hotell i to etasjer bruke unntaket for brannklasse?"],
    }),
    "Overnattingsbygg med høyst to etasjer og under 300 m2",
  );
  expectIncludes(
    "Uten treff sier at VTEK-grunnlaget ikke avklarer",
    await advisor.answerQuestion("Kan jeg bruke en ukjent spesialløsning for kaffemaskinrom?", data.legalReferences),
    "ikke nok lokalt kildegrunnlag",
  );
  expectIncludes(
    "Utenfor kildegrunnlag avgrenses",
    await advisor.answerQuestion("Hva er beste kaffemaskin?", data.legalReferences),
    "Utenfor kildegrunnlaget",
  );

  const originalFetch = global.fetch;
  const calls = [];
  global.fetch = async (url, options = {}) => {
    calls.push({ url, options });
    if (url.endsWith("/api/tags")) {
      return mockJsonResponse({ models: [] });
    }
    if (url.endsWith("/api/pull")) {
      return mockJsonResponse({ status: "success" });
    }
    if (url.endsWith("/api/chat")) {
      return mockJsonResponse({ message: { content: "Kort lokalt svar med kilde." } });
    }
    throw new Error(`Unexpected fetch URL: ${url}`);
  };

  advisor.localLlmConfig.enabled = true;
  advisor.localLlmConfig.baseUrl = "http://ollama.test";
  const statusEvents = [];
  advisor.localLlmConfig.onStatus = (event) => statusEvents.push(event.kind);
  advisor.resetLocalModelCheck();
  await advisor.prepareLocalLlm();
  const localAnswer = await advisor.askLocalLlm("Hva avgjør risikoklasse?", [advisor.sources[0]], data.legalReferences);
  advisor.localLlmConfig.enabled = false;
  advisor.localLlmConfig.onStatus = null;
  global.fetch = originalFetch;

  expectIncludes("Klargjøring laster ned valgt modell", calls.map((call) => call.url).join(" "), "/api/pull");
  expectIncludes("Lokal LLM svar rendres", localAnswer, "Lokalt LLM-svar");
  expectIncludes("Lokal LLM viser status", statusEvents.join(" "), "pulling");
  const chatBody = JSON.parse(calls.find((call) => call.url.endsWith("/api/chat")).options.body);
  expectIncludes("Lokal LLM bruker kort svargrense", JSON.stringify(chatBody.options), "num_predict");
  expectIncludes("Lokal LLM holdes varm", chatBody.keep_alive, "10m");
  expectIncludes("Lokal LLM får veiledningskilde", chatBody.messages.map((message) => message.content).join(" "), "Veiledning");
  expectIncludes("Lokal LLM får problemstillingsinstruks", chatBody.messages.map((message) => message.content).join(" "), "Preakseptert spor");
  expectIncludes("Lokal LLM får konkrete veiledningspunkter", chatBody.messages.map((message) => message.content).join(" "), "Konkrete punkter");
  expectIncludes("Standardmodell er rask Qwen instruct", chatBody.model, "qwen3:4b-instruct");

  advisor.setLocalLlmModel("qwen3:8b");
  expectIncludes("Modellvalg oppdaterer konfigurasjonen", advisor.localLlmConfig.model, "qwen3:8b");
  let qwenChatBody = null;
  global.fetch = async (url, options = {}) => {
    if (url.endsWith("/api/tags")) return mockJsonResponse({ models: [{ name: "qwen3:8b" }] });
    if (url.endsWith("/api/chat")) {
      qwenChatBody = JSON.parse(options.body);
      return mockJsonResponse({ message: { content: "Svar uten tenkemodus." } });
    }
    throw new Error(`Unexpected fetch URL: ${url}`);
  };
  advisor.localLlmConfig.enabled = true;
  await advisor.askLocalLlm("Test", [advisor.sources[0]], data.legalReferences);
  advisor.localLlmConfig.enabled = false;
  expectIncludes("Qwen 8B bruker ikke treg tenkemodus", String(qwenChatBody.think), "false");

  advisor.setLocalLlmModel("gemma3:4b");
  const missingModelCalls = [];
  global.fetch = async (url) => {
    missingModelCalls.push(url);
    if (url.endsWith("/api/tags")) return mockJsonResponse({ models: [] });
    throw new Error(`Unexpected fetch URL: ${url}`);
  };
  advisor.localLlmConfig.enabled = true;
  try {
    await advisor.askLocalLlm("Test", [advisor.sources[0]], data.legalReferences);
  } catch (error) {
    expectIncludes("Manglende modell gir tydelig feil", error.message, "må klargjøres");
  }
  advisor.localLlmConfig.enabled = false;
  expectIncludes("Vanlig spørsmål starter ikke modellnedlasting", String(missingModelCalls.some((url) => url.endsWith("/api/pull"))), "false");

  advisor.setLocalLlmModel("qwen3:8b");

  const checkCalls = [];
  global.fetch = async (url) => {
    checkCalls.push(url);
    if (url.endsWith("/api/tags")) {
      return mockJsonResponse({ models: [{ name: "QWEN3:8B" }] });
    }
    throw new Error(`Unexpected fetch URL: ${url}`);
  };

  advisor.localLlmConfig.enabled = true;
  advisor.localLlmConfig.onStatus = (event) => statusEvents.push(event.kind);
  const checkResult = await advisor.checkLocalLlm();
  advisor.localLlmConfig.onStatus = null;
  global.fetch = originalFetch;

  expectIncludes("Ollama-sjekk bruker tags", checkCalls.join(" "), "/api/tags");
  expectIncludes("Ollama-sjekk finner modell", String(checkResult.modelAvailable), "true");
  expectIncludes("Modellsjekk tåler normalisert bokstavstørrelse", String(checkResult.modelAvailable), "true");
  expectIncludes("Ollama-sjekk aktiverer lokal LLM", String(advisor.localLlmConfig.enabled), "true");
  advisor.localLlmConfig.enabled = false;

  for (const check of checks) {
    console.log(`${check.ok ? "PASS" : "FAIL"} | ${check.label} | expected includes=${check.expected}`);
  }

  const failed = checks.filter((check) => !check.ok);
  console.log(`\n${checks.length - failed.length}/${checks.length} advisor checks passed`);

  if (failed.length) {
    process.exit(1);
  }
})();

function mockJsonResponse(payload) {
  return {
    ok: true,
    status: 200,
    json: async () => payload,
  };
}
