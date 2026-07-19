window.TEK17Advisor = window.TEK17Advisor || {};

const MIN_RETRIEVAL_SCORE = 18;
const MAX_RETRIEVAL_RESULTS = 6;

window.TEK17Advisor.retrieveSources = function retrieveSources(question, sources) {
  return retrieveSourceMatches(question, sources).map((match) => match.source);
};

window.TEK17Advisor.retrieveSourceMatches = retrieveSourceMatches;

function retrieveSourceMatches(question, sources) {
  const normalizedQuestion = normalize(question);
  if (!normalizedQuestion) return [];

  const context = buildQuestionContext(normalizedQuestion);
  const matches = sources
    .map((source) => scoreSource(context, source))
    .filter((match) => {
      const hasEnoughTokenEvidence = match.tokenMatches >= 2;
      return match.score >= MIN_RETRIEVAL_SCORE && (match.strongSignals > 0 || hasEnoughTokenEvidence);
    })
    .sort((a, b) => b.score - a.score || sourceTypePriority(a.source) - sourceTypePriority(b.source));

  if (!matches.length) return [];

  const topScore = matches[0].score;
  const relativeThreshold = Math.max(MIN_RETRIEVAL_SCORE, Math.floor(topScore * 0.4));
  const resultLimit = dynamicResultLimit(context);

  return matches
    .filter((match) => match.score >= relativeThreshold)
    .slice(0, resultLimit);
}

function scoreSource(context, source) {
  const fields = searchableFields(source);
  const sourceText = fields.join(" ");
  const sourceTokens = new Set(tokenize(sourceText));
  let score = 0;
  let strongSignals = 0;
  const matchedTokens = new Set();

  const sectionNumber = normalize((source.section ?? "").match(/\d{1,2}-\d{1,2}/)?.[0] ?? "");
  if (sectionNumber && context.normalized.includes(sectionNumber)) {
    score += 120;
    strongSignals += 1;
  }

  for (const phrase of source.phrases ?? []) {
    const normalizedPhrase = normalize(phrase);
    if (normalizedPhrase && context.normalized.includes(normalizedPhrase)) {
      score += 42 + Math.min(normalizedPhrase.length, 24);
      strongSignals += 1;
    }
  }

  for (const topic of source.topics ?? []) {
    const normalizedTopic = normalize(topic);
    if (!normalizedTopic) continue;

    const topicTokens = tokenize(normalizedTopic);
    const isExactMatch = topicTokens.length > 1
      ? context.normalized.includes(normalizedTopic)
      : context.baseTokenSet.has(normalizedTopic);
    if (isExactMatch) {
      score += 20 + Math.min(normalizedTopic.length, 20);
      strongSignals += 1;
    }
  }

  for (const token of context.baseTokens) {
    if (!sourceTokens.has(token)) continue;
    matchedTokens.add(token);
    score += Math.max(3, Math.min(token.length, 10));
  }

  for (const token of context.expandedTokens) {
    if (context.baseTokenSet.has(token) || !sourceTokens.has(token)) continue;
    matchedTokens.add(token);
    score += 4;
  }

  if (matchedTokens.size >= 3) score += matchedTokens.size * 3;
  if (normalize(source.title).includes(context.normalized) && context.baseTokens.length > 1) {
    score += 35;
    strongSignals += 1;
  }

  return {
    source,
    score,
    strongSignals,
    tokenMatches: matchedTokens.size,
  };
}

function searchableFields(source) {
  return [
    source.section,
    source.paragraph,
    source.sourceType,
    source.title,
    source.shortAnswer,
    source.practicalMeaning,
    source.assessmentNote,
    source.vtekSearch,
    source.preacceptedPath,
    source.outsidePreaccepted,
    ...(source.topics ?? []),
    ...(source.phrases ?? []),
    ...(source.keyPoints ?? []),
  ]
    .filter(Boolean)
    .map(normalize);
}

function buildQuestionContext(normalizedQuestion) {
  const baseTokens = unique(
    tokenize(normalizedQuestion).filter((token) => !STOP_WORDS.has(token) && token.length > 1),
  );
  const expandedTokens = unique(baseTokens.flatMap((token) => [token, ...(SYNONYMS.get(token) ?? [])]));

  return {
    normalized: normalizedQuestion,
    baseTokens,
    baseTokenSet: new Set(baseTokens),
    expandedTokens,
    hasExplicitSection: /(?:^|\s)11\s+\d{1,2}(?:\s|$)/.test(normalizedQuestion),
    isBroadQuestion: /\b(og|samt|kombinasjon|problemstilling|helhetlig|flere)\b/.test(normalizedQuestion),
  };
}

function dynamicResultLimit(context) {
  if (context.isBroadQuestion || context.baseTokens.length >= 9) return MAX_RETRIEVAL_RESULTS;
  if (context.baseTokens.length >= 6) return 5;
  if (context.hasExplicitSection || context.baseTokens.length >= 3) return 4;
  return 3;
}

function sourceTypePriority(source) {
  return {
    "forskriftskrav": 0,
    "preakseptert-ytelse": 1,
    "veiledning": 2,
  }[source.sourceType] ?? 3;
}

function tokenize(value) {
  return value.match(/[a-z0-9æøå]+/gi) ?? [];
}

function normalize(value) {
  return String(value ?? "")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[§/_.:,;()[\]{}]+/g, " ")
    .replace(/[-–—]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function unique(values) {
  return Array.from(new Set(values));
}

function synonymMap(groups) {
  const map = new Map();
  for (const group of groups) {
    for (const token of group) {
      map.set(token, group.filter((candidate) => candidate !== token));
    }
  }
  return map;
}

const SYNONYMS = synonymMap([
  ["rkl", "risikoklasse"],
  ["bkl", "brannklasse"],
  ["tkl", "tiltaksklasse"],
  ["fluktvei", "fluktveien", "rømning", "rømningsvei", "rømningsveien", "rømningsveier"],
  ["bred", "bredde", "bredden", "rømningsbredde"],
  ["utgang", "utgangen", "utganger", "rømningsutgang"],
  ["branncelle", "branncellen", "brannceller", "branncellene"],
  ["etasje", "etasjen", "etasjer", "etasjene"],
  ["sprinkler", "sprinkleranlegg", "slokkeanlegg"],
  ["håndslokker", "slokkeapparat", "brannslokkeapparat"],
  ["brannslange", "slangeutlegg"],
  ["nabobygg", "nabobygning", "brannspredning"],
  ["brannskille", "brannskillende", "branncellebegrensende"],
  ["bærekonstruksjon", "bæresystem", "bæreevne"],
  ["ventilasjonskanal", "kanal", "ventilasjon"],
  ["gjennomføring", "branntetting", "tetting"],
  ["eksplosjonsfare", "eksplosjon", "trykkavlastning"],
  ["brannvesen", "slokkemannskap", "redningsmannskap"],
  ["fjøs", "stall", "husdyrrom"],
]);

const STOP_WORDS = new Set([
  "at", "av", "bruke", "bruker", "den", "det", "du", "eller", "en", "er", "et", "for", "fra", "gjelder", "her", "hva", "hvis", "hvordan",
  "i", "ikke", "jeg", "kan", "med", "ogsa", "om", "pa", "som", "til", "ved", "vil", "skal", "ma", "man", "mitt", "min", "dette", "denne",
  "vtek", "veiledning", "problemstilling", "preakseptert", "preaksepterte", "løsning", "løsninger", "bygg", "byggverk", "rom",
]);
