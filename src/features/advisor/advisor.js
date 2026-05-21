window.TEK17Advisor = window.TEK17Advisor || {};

window.TEK17Advisor.answerQuestion = async function answerQuestion(question, legalReferences) {
  const matchedSources = window.TEK17Advisor.retrieveSources(question, window.TEK17Advisor.sources);
  try {
    const localAnswer = await window.TEK17Advisor.askLocalLlm(question, matchedSources, legalReferences);
    if (localAnswer) return localAnswer;
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
      message: "Ingen godkjente kilder traff spørsmålet.",
    });
  }

  return window.TEK17Advisor.buildAnswer(question, matchedSources, legalReferences);
};
