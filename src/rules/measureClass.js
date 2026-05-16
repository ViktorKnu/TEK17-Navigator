window.TEK17Rules = window.TEK17Rules || {};

window.TEK17Rules.classifyMeasure = function classifyMeasure(input, riskResult, fireResult, legalReferences) {
  const reasons = [];
  let value = 1;

  if (input.complexity === "medium" || input.consequence === "medium" || input.coordination || fireResult.finalValue === 3) {
    value = 2;
  }

  if (
    input.complexity === "high" ||
    input.consequence === "large" ||
    input.analysis ||
    fireResult.finalValue === 4 ||
    riskResult.value === 6
  ) {
    value = 3;
  }

  reasons.push(`Oppgaven vurderes med ${labelComplexity(input.complexity).toLowerCase()} kompleksitet og ${labelConsequence(input.consequence).toLowerCase()}.`);
  if (input.preaccepted && !input.analysis) reasons.push("Brannkonseptet bygger i hovedsak på preaksepterte ytelser.");
  if (input.analysis) reasons.push("Analyse eller fraviksvurdering trekker tiltaket opp i tiltaksklasse 3 i denne demoen.");
  if (input.coordination) reasons.push("Tett samordning mellom flere fagområder trekker vurderingen opp.");
  if (fireResult.finalValue === 4) reasons.push("BKL 4 er en sterk indikator på høy konsekvens og behov for særskilt dokumentasjon.");

  return {
    value,
    confidence: value === 1 ? "simple" : value === 2 ? "normal" : "complex",
    reasons,
    legalBasis: [legalReferences.measure93, legalReferences.measure94],
  };
};

function labelComplexity(value) {
  return { low: "Lav", medium: "Middels", high: "Høy" }[value];
}

function labelConsequence(value) {
  return { small: "små konsekvenser", medium: "middels konsekvenser", large: "store konsekvenser" }[value];
}
