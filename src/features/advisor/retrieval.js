window.TEK17Advisor = window.TEK17Advisor || {};

window.TEK17Advisor.retrieveSources = function retrieveSources(question, sources) {
  const normalized = normalize(question);
  if (!normalized) return [];

  return sources
    .map((source) => ({ source, score: scoreSource(normalized, source) }))
    .filter((match) => match.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((match) => match.source);
};

function scoreSource(normalizedQuestion, source) {
  const searchableText = [
    source.title,
    source.shortAnswer,
    source.practicalMeaning,
    source.assessmentNote,
    ...(source.topics ?? []),
    ...(source.keyPoints ?? []),
  ]
    .map(normalize)
    .join(" ");
  const sourceTokens = new Set(tokenize(searchableText));
  const questionTokens = tokenize(normalizedQuestion).filter((token) => !STOP_WORDS.has(token));
  const questionTokenSet = new Set(questionTokens);
  const tokenScore = questionTokens.reduce(
    (score, token) => score + (sourceTokens.has(token) ? Math.max(2, Math.min(token.length, 8)) : 0),
    0,
  );
  const topicScore = (source.topics ?? []).reduce((score, topic) => {
    const normalizedTopic = normalize(topic);
    const isMatch = normalizedTopic.includes(" ")
      ? normalizedQuestion.includes(normalizedTopic)
      : questionTokenSet.has(normalizedTopic);
    return normalizedTopic && isMatch
      ? score + 8 + normalizedTopic.length
      : score;
  }, 0);

  return tokenScore + topicScore;
}

function tokenize(value) {
  return value.match(/[a-z0-9æøå]+/gi) ?? [];
}

function normalize(value) {
  return value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

const STOP_WORDS = new Set([
  "at", "av", "bruke", "bruker", "den", "det", "du", "eller", "en", "er", "et", "for", "fra", "gjelder", "her", "hva", "hvis", "hvordan",
  "i", "ikke", "jeg", "kan", "med", "og", "ogsa", "om", "pa", "som", "til", "ved", "vtek", "veiledning", "problemstilling",
  "preakseptert", "preaksepterte",
]);
