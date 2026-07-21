window.TEK17Advisor = window.TEK17Advisor || {};

window.TEK17Advisor.answerQuestion = async function answerQuestion(question, legalReferences, context = {}) {
  const directSources = window.TEK17Advisor.retrieveSources(question, window.TEK17Advisor.sources);
  const byggforskCatalog = window.TEK17Data?.byggforskCatalog ?? [];
  const directByggforsk = window.TEK17Advisor.retrieveSources(question, byggforskCatalog);
  const contextualSources = context.previousQuestions?.length
    ? window.TEK17Advisor.retrieveSources(
        `${context.previousQuestions.slice(-3).join(" ")} ${question}`,
        window.TEK17Advisor.sources,
      )
    : [];
  const contextualByggforsk = context.previousQuestions?.length
    ? window.TEK17Advisor.retrieveSources(
        `${context.previousQuestions.slice(-3).join(" ")} ${question}`,
        byggforskCatalog,
      )
    : [];
  const matchedSources = Array.from(
    new Map([...directSources, ...contextualSources].map((source) => [source.id, source])).values(),
  ).slice(0, 6);
  const matchedByggforsk = Array.from(
    new Map([...directByggforsk, ...contextualByggforsk].map((source) => [source.id, source])).values(),
  ).slice(0, 3);
  const byggforskRecommendations = window.TEK17Advisor.renderByggforskRecommendations(matchedByggforsk);
  try {
    const localAnswer = await window.TEK17Advisor.askLocalLlm(question, matchedSources, legalReferences, context);
    if (localAnswer) return `${localAnswer}${byggforskRecommendations}`;
  } catch (error) {
    window.TEK17Advisor.localLlmConfig?.onStatus?.({
      kind: "fallback",
      message: "Lokal LLM er ikke tilgjengelig. Bruker kildebasert svar.",
    });
    console.info("Lokal LLM er ikke tilgjengelig. Bruker kildebasert fallback.", error);
  }

  if (!matchedSources.length) {
    window.TEK17Advisor.localLlmConfig?.onStatus?.({
      kind: "limited",
      message: matchedByggforsk.length
        ? "Ingen TEK17/SAK10-kilder traff. Viser relevant faglig fordypning."
        : "Ingen godkjente kilder traff spørsmålet.",
    });
  }

  return `${window.TEK17Advisor.buildAnswer(question, matchedSources, legalReferences)}${byggforskRecommendations}`;
};
