window.TEK17Advisor = window.TEK17Advisor || {};

const LOCAL_LLM_MODEL_STORAGE_KEY = "tek17LocalLlmModel";
const DEFAULT_LOCAL_LLM_MODEL = "qwen3:4b-instruct";

window.TEK17Advisor.localLlmModels = [
  {
    id: "qwen3:4b-instruct",
    name: "Qwen 3 4B Instruct",
    tier: "Rask",
    size: "2,5 GB",
    hardware: "8 GB RAM eller mer",
    description: "Anbefalt standardvalg. God norskstøtte og korte svar uten ekstra tenkemodus.",
    advantages: ["Raskest av de anbefalte modellene", "Støtter både bokmål og nynorsk", "God til korte, kildebundne svar"],
    limitations: ["Mindre kapasitet enn 8B- og 12B-modellene ved sammensatte problemstillinger"],
  },
  {
    id: "gemma3:4b",
    name: "Gemma 3 4B",
    tier: "Balansert",
    size: "3,3 GB",
    hardware: "8 GB RAM eller mer",
    description: "Flerspråklig alternativ med litt høyere ressursbruk enn Qwen 4B.",
    advantages: ["God allroundmodell", "Sterk på instruksjoner og oppsummering", "Passer vanlige bærbare og stasjonære PC-er"],
    limitations: ["Litt større og ofte tregere enn Qwen 4B", "Ikke spesielt trent for norsk fagterminologi"],
  },
  {
    id: "NbAiLab/borealis-instruct-preview:4b",
    name: "Borealis 4B",
    tier: "Norsk forhåndsversjon",
    size: "3,3 GB",
    hardware: "8 GB RAM eller mer",
    description: "Norsktilpasset modell fra Nasjonalbibliotekets AI-lab. Fortsatt en forhåndsversjon.",
    advantages: ["Norsktilpasset språkmodell", "Interessant for norsk ordvalg og fagterminologi", "Moderat størrelse"],
    limitations: ["Forhåndsversjon med mindre modenhet og testing", "Kan variere mer i presisjon enn etablerte modeller"],
  },
  {
    id: "qwen3:8b",
    name: "Qwen 3 8B",
    tier: "Grundig",
    size: "5,2 GB",
    hardware: "16 GB RAM eller dedikert GPU",
    description: "Bedre kapasitet for sammensatte problemstillinger. Tenkemodus er slått av for raskere svar.",
    think: false,
    advantages: ["Bedre forståelse av sammensatte spørsmål enn 4B", "Støtter bokmål og nynorsk", "God balanse på sterkere PC-er"],
    limitations: ["Krever mer minne og er tregere enn Qwen 4B", "Kan bli langsom uten dedikert GPU"],
  },
  {
    id: "gemma3:12b",
    name: "Gemma 3 12B",
    tier: "Kraftig PC",
    size: "8,1 GB",
    hardware: "24 GB RAM eller god dedikert GPU",
    description: "Sterkere språk- og resonneringskapasitet, men merkbart tregere uten god maskinvare.",
    advantages: ["Sterk på komplekse problemstillinger og lange kilder", "Bedre nyansering enn de mindre modellene", "God generell svarkvalitet"],
    limitations: ["Høyt minnebehov og lang responstid på vanlige PC-er", "Ikke spesielt trent for norsk fagterminologi"],
  },
  {
    id: "NbAiLab/borealis-instruct-preview:12b",
    name: "Borealis 12B",
    tier: "Norsk, kraftig PC",
    size: "8,7 GB",
    hardware: "24 GB RAM eller god dedikert GPU",
    description: "Større norsktilpasset forhåndsversjon for maskiner med god kapasitet.",
    advantages: ["Større norsktilpasset modell", "Best egnet til å prøve norsk språk og terminologi i krevende spørsmål", "Mer kapasitet enn Borealis 4B"],
    limitations: ["Forhåndsversjon som fortsatt må kvalitetstestes", "Krever mye minne og kan være svært treg uten god GPU"],
  },
];

window.TEK17Advisor.localLlmConfig = {
  enabled: isLocalRuntime() || isLocalLlmEnabledByUser(),
  baseUrl: "http://localhost:11434",
  model: getSavedLocalModel(),
  keepAlive: "10m",
  requestTimeouts: {
    check: 5000,
    generate: 180000,
    pull: 1800000,
  },
  generationOptions: {
    temperature: 0.1,
    top_k: 20,
    top_p: 0.8,
    num_ctx: 2048,
    num_predict: 240,
  },
  onStatus: null,
};

let localModelReadyPromise = null;

window.TEK17Advisor.askLocalLlm = async function askLocalLlm(
  question,
  matchedSources,
  legalReferences,
  context = {},
  byggforskSources = [],
) {
  const config = window.TEK17Advisor.localLlmConfig;
  if (!config.enabled || !matchedSources.length) return null;

  notifyLocalLlmStatus("checking", "Sjekker lokal LLM og modell...");
  await ensureLocalModel(config, { pullIfMissing: false });

  notifyLocalLlmStatus("generating", "Lokal LLM skriver et kort svar...");
  const modelProfile = getLocalLlmModel(config.model);
  const chatBody = {
    model: config.model,
    stream: false,
    keep_alive: config.keepAlive,
    messages: [
      {
        role: "system",
        content:
          "Du er TEK17 Navigator sin lokale fagassistent. Svar kun på norsk. Bruk bare opplysninger som står uttrykkelig i forskriften og veiledningen i det juridiske kildegrunnlaget når du omtaler krav, preaksepterte ytelser eller dokumentasjon. For problemstillinger skal du først lete etter om situasjonen er dekket av VTEK/veiledning og preaksepterte ytelser. Hvis den er dekket, si at den ser ut til å følge preakseptert spor og vis til kilden. Hvis den ikke er dekket, si tydelig at den ikke står i kildegrunnlaget og må vurderes som fravik, analyse eller særskilt dokumentasjon. Byggforsk-delen inneholder bare offentlig katalogmetadata. Bruk den kun til å anbefale høyst én mest relevant anvisning for videre lesning, og opplys at fullteksten krever ekstern tilgang. Ikke påstå hva fullteksten sier, og ikke framstill anvisningen som forskriftskrav, preakseptert ytelse eller dokumentasjon på forskriftsoppfyllelse. Ikke legg til egne eksempler, kontrollpunkter, paragrafer, krav, standarder eller tall.",
      },
      {
        role: "user",
        content: buildLocalPrompt(question, matchedSources, legalReferences, context, byggforskSources),
      },
    ],
    options: config.generationOptions,
  };
  if (typeof modelProfile?.think === "boolean") chatBody.think = modelProfile.think;

  const response = await fetch(`${config.baseUrl}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(chatBody),
    signal: AbortSignal.timeout(config.requestTimeouts.generate),
  });

  if (!response.ok) {
    throw new Error(`Lokal LLM svarte med HTTP ${response.status}`);
  }

  const payload = await response.json();
  const content = payload.message?.content?.trim();
  if (!content) return null;

  notifyLocalLlmStatus("ready", `Assistent klar med ${config.model}.`);
  return renderLocalLlmAnswer(content, matchedSources, legalReferences);
};

window.TEK17Advisor.ensureLocalModel = ensureLocalModel;
window.TEK17Advisor.getLocalLlmModel = getLocalLlmModel;
window.TEK17Advisor.setLocalLlmModel = function setLocalLlmModel(modelId) {
  const model = getLocalLlmModel(modelId);
  if (!model) throw new Error(`Ukjent lokal modell: ${modelId}`);

  window.TEK17Advisor.localLlmConfig.model = model.id;
  localModelReadyPromise = null;
  try {
    window.localStorage?.setItem(LOCAL_LLM_MODEL_STORAGE_KEY, model.id);
  } catch (error) {
    console.info("Kunne ikke lagre valgt lokal modell.", error);
  }
  return model;
};
window.TEK17Advisor.resetLocalModelCheck = function resetLocalModelCheck() {
  localModelReadyPromise = null;
};
window.TEK17Advisor.checkLocalLlm = checkLocalLlm;
window.TEK17Advisor.prepareLocalLlm = async function prepareLocalLlm() {
  const config = window.TEK17Advisor.localLlmConfig;
  notifyLocalLlmStatus("checking", "Sjekker Ollama og lokal modell...");
  await ensureLocalModel(config, { pullIfMissing: true });
  enableLocalLlm();
  return checkLocalLlm();
};

async function checkLocalLlm() {
  const config = window.TEK17Advisor.localLlmConfig;
  notifyLocalLlmStatus("checking", "Sjekker om Ollama kjører...");
  const hasModel = await hasLocalModel(config);
  const status = hasModel ? "ready" : "missing-model";
  notifyLocalLlmStatus(status, hasModel ? `Assistent klar med ${config.model}.` : `${config.model} er ikke lastet ned ennå.`);
  if (hasModel) enableLocalLlm();

  return {
    ollamaAvailable: true,
    modelAvailable: hasModel,
    model: config.model,
  };
}

async function ensureLocalModel(config, { pullIfMissing = false } = {}) {
  if (!localModelReadyPromise) {
    localModelReadyPromise = ensureLocalModelOnce(config, pullIfMissing).catch((error) => {
      localModelReadyPromise = null;
      throw error;
    });
  }

  await localModelReadyPromise;
}

async function ensureLocalModelOnce(config, pullIfMissing) {
  if (await hasLocalModel(config)) {
    notifyLocalLlmStatus("ready", `Assistent klar med ${config.model}.`);
    return;
  }

  if (!pullIfMissing) {
    notifyLocalLlmStatus("missing-model", `${config.model} er ikke lastet ned ennå.`);
    throw new Error(`${config.model} må klargjøres før den kan brukes`);
  }

  notifyLocalLlmStatus("pulling", `Laster ned ${config.model}. Dette kan ta litt tid første gang.`);
  await pullLocalModel(config);
  notifyLocalLlmStatus("ready", `Assistent klar med ${config.model}.`);
}

async function hasLocalModel(config) {
  const response = await fetch(`${config.baseUrl}/api/tags`, {
    signal: AbortSignal.timeout(config.requestTimeouts.check),
  });
  if (!response.ok) {
    throw new Error(`Ollama svarte med HTTP ${response.status} ved modellkontroll`);
  }

  const payload = await response.json();
  const models = payload.models ?? [];
  return models.some((item) => isSameModel(item.name, config.model) || isSameModel(item.model, config.model));
}

async function pullLocalModel(config) {
  const response = await fetch(`${config.baseUrl}/api/pull`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: config.model,
      stream: false,
    }),
    signal: AbortSignal.timeout(config.requestTimeouts.pull),
  });

  if (!response.ok) {
    throw new Error(`Ollama klarte ikke å laste ned ${config.model}. HTTP ${response.status}`);
  }
}

function isSameModel(candidate, requested) {
  if (!candidate) return false;
  const normalizedCandidate = candidate.toLowerCase();
  const normalizedRequested = requested.toLowerCase();
  return (
    normalizedCandidate === normalizedRequested ||
    `${normalizedCandidate}:latest` === normalizedRequested ||
    normalizedCandidate === `${normalizedRequested}:latest`
  );
}

function getLocalLlmModel(modelId) {
  return window.TEK17Advisor.localLlmModels.find((model) => model.id === modelId) ?? null;
}

function getSavedLocalModel() {
  try {
    const savedModel = window.localStorage?.getItem(LOCAL_LLM_MODEL_STORAGE_KEY);
    if (getLocalLlmModel(savedModel)) return savedModel;
  } catch (error) {
    console.info("Kunne ikke lese valgt lokal modell.", error);
  }
  return DEFAULT_LOCAL_LLM_MODEL;
}

function notifyLocalLlmStatus(kind, message) {
  const handler = window.TEK17Advisor.localLlmConfig.onStatus;
  if (typeof handler === "function") {
    handler({ kind, message });
  }
}

function enableLocalLlm() {
  window.TEK17Advisor.localLlmConfig.enabled = true;
  try {
    window.localStorage?.setItem("tek17LocalLlmEnabled", "true");
  } catch (error) {
    console.info("Kunne ikke lagre lokal LLM-status.", error);
  }
}

function isLocalRuntime() {
  const location = window.location;
  if (!location) return true;

  return (
    location.protocol === "file:" ||
    location.hostname === "localhost" ||
    location.hostname === "127.0.0.1" ||
    location.hostname === "::1" ||
    location.hostname === "[::1]"
  );
}

function isLocalLlmEnabledByUser() {
  try {
    return window.localStorage?.getItem("tek17LocalLlmEnabled") === "true";
  } catch (error) {
    return false;
  }
}

function buildLocalPrompt(question, matchedSources, legalReferences, context, byggforskSources) {
  const sourceText = matchedSources
    .map((source) => {
      const refs = getReferences(source, legalReferences);
      return [
        `Tema: ${source.title}`,
        `Kildetype: ${source.sourceType ?? "ikke angitt"}`,
        `Paragraf: ${source.section ?? "ikke angitt"}`,
        `Ledd/tema: ${source.paragraph ?? "ikke angitt"}`,
        `Kort svar: ${source.shortAnswer}`,
        `Praktisk betydning: ${source.practicalMeaning}`,
        `Faglig merknad fra appen: ${source.assessmentNote}`,
        `Sjekk i VTEK/veiledning: ${source.vtekSearch ?? "Ikke angitt."}`,
        `Preakseptert spor: ${source.preacceptedPath ?? "Ikke angitt."}`,
        `Hvis det ikke står der: ${source.outsidePreaccepted ?? "Ikke angitt."}`,
        `Konkrete punkter fra forskrift/veiledning:\n${(source.keyPoints ?? []).map((point) => `- ${point}`).join("\n") || "- Ingen ekstra punkter."}`,
        "Kilder:",
        refs.map((ref) => `- ${ref.tag}: ${ref.title}. ${ref.summary}`).join("\n"),
      ].join("\n");
    })
    .join("\n\n");

  return [
    context.previousQuestions?.length
      ? `Tidligere spørsmål i samme samtale:\n${context.previousQuestions.slice(-3).map((item) => `- ${item}`).join("\n")}`
      : "Tidligere spørsmål i samme samtale: Ingen.",
    "",
    `Spørsmål: ${question}`,
    "",
    "Kildegrunnlag:",
    sourceText,
    "",
    buildByggforskPromptSection(byggforskSources),
    "",
    "Svar med maks 6 korte linjer. Hver linje skal ha høyst 18 ord:",
    "1. Kort konklusjon",
    "2. Treffer problemstillingen VTEK/veiledningen?",
    "3. Er dette preakseptert, eller står det ikke i kildegrunnlaget?",
    "4. Relevant hjemmel/kilde",
    "5. Eventuelt avvik, analysebehov eller mulig videre løsning",
    "6. Hvis det finnes katalogtreff, avslutt nøyaktig slik: Byggforsk: [nummer] [tittel] (fulltekst krever ekstern tilgang).",
  ].join("\n");
}

function buildByggforskPromptSection(sources) {
  if (!sources?.length) {
    return "Byggforsk-katalogmetadata: Ingen relevante treff.";
  }

  const metadata = sources
    .slice(0, 3)
    .map((source) => [
      source.number,
      source.title,
      `versjon ${source.version}`,
      `relevant for TEK17 ${source.relevantSections.join(", ")}`,
      `tema: ${source.topics.join(", ")}`,
      source.accessStatus,
      source.url,
    ].join(" | "))
    .map((line) => `- ${line}`)
    .join("\n");

  return [
    "Byggforsk-katalogmetadata (faglig fordypning, ikke juridisk svargrunnlag):",
    metadata,
    "Katalogen sier bare hvilke anvisninger som kan være relevante. Den sier ikke hva fullteksten krever eller anbefaler.",
  ].join("\n");
}

function renderLocalLlmAnswer(answer, matchedSources, legalReferences) {
  const references = uniqueReferences(matchedSources, legalReferences);

  return `
    <section>
      <h3>Lokalt LLM-svar</h3>
      ${answer
        .split("\n")
        .filter(Boolean)
        .map((line) => `<p>${escapeHtml(line)}</p>`)
        .join("")}
      <div class="source-list">
        ${references.map(referenceLink).join("")}
      </div>
    </section>
    <p class="field-note">Svaret er generert lokalt fra hentede forskrifts- og veiledningskilder. Kontroller hjemmel ved faglig bruk.</p>
  `;
}

function uniqueReferences(matchedSources, legalReferences) {
  const refs = matchedSources.flatMap((source) => getReferences(source, legalReferences));
  return Array.from(new Map(refs.map((ref) => [ref.title, ref])).values());
}

function getReferences(source, legalReferences) {
  const keys = source.referenceKeys ?? [source.referenceKey];
  return keys.map((key) => legalReferences[key]).filter(Boolean);
}

function referenceLink(ref) {
  return `<p class="source-line"><span>${ref.tag}</span><a href="${ref.url}" target="_blank" rel="noreferrer">${ref.title}</a></p>`;
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (char) => {
    return {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    }[char];
  });
}
