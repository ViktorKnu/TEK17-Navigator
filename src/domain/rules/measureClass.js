window.TEK17Rules = window.TEK17Rules || {};

window.TEK17Rules.classifyMeasure = function classifyMeasure(input, riskResult, fireResult, legalReferences) {
  const drivers = [];
  const reasons = [];
  const value = getMeasureClass(input.complexity, input.consequence);

  if (input.complexity === "medium") drivers.push("middels kompleksitet");
  if (input.complexity === "high") drivers.push("høy kompleksitet");
  if (input.consequence === "medium") drivers.push("middels konsekvens ved feil");
  if (input.consequence === "large") drivers.push("store konsekvenser ved feil");

  reasons.push(`${labelTaskType(input.taskType)} vurderes som oppgave/fagområde etter SAK10.`);
  reasons.push(`Oppgaven vurderes med ${labelComplexity(input.complexity).toLowerCase()} kompleksitet og ${labelConsequence(input.consequence).toLowerCase()}.`);
  if (input.preaccepted && !input.analysis) reasons.push("Brannkonseptet bygger i hovedsak på preaksepterte ytelser.");
  reasons.push(describeMeasureMatrix(value, input));
  if (input.analysis) reasons.push("Analyse eller fravik må inngå i vurderingen av faglig vanskelighetsgrad, men gir ikke automatisk tiltaksklasse 3.");
  if (input.coordination) reasons.push("Tett samordning må inngå i vurderingen av kompleksitet, men gir ikke alene en bestemt tiltaksklasse.");
  if (fireResult.finalValue >= 3) reasons.push(`BKL ${fireResult.finalValue} er relevant for konsekvensvurderingen, men fastsetter ikke tiltaksklassen alene.`);
  if (riskResult.value === 6) reasons.push("RKL 6 er relevant for konsekvensvurderingen, men fastsetter ikke tiltaksklassen alene.");
  reasons.push("Ansvarlig søker foreslår tiltaksklasse, og kommunen fastsetter den i byggesaken.");

  return {
    value,
    confidence: value === 1 ? "simple" : value === 2 ? "normal" : "complex",
    status: value === 1 ? "low-complexity" : value === 2 ? "moderate-complexity" : "high-complexity",
    statusLabel: value === 1 ? "Enkel oppgave" : value === 2 ? "Tiltaksklasse 2-nivå" : "Tiltaksklasse 3-nivå",
    taskType: input.taskType,
    taskLabel: labelTaskType(input.taskType),
    drivers: Array.from(new Set(drivers)),
    reasons,
    legalBasis: [legalReferences.measure93, legalReferences.measure94],
  };
};

function getMeasureClass(complexity, consequence) {
  if (complexity === "high") return 3;
  if (complexity === "medium" && consequence === "large") return 3;
  if (complexity === "low" && consequence === "small") return 1;
  return 2;
}

function describeMeasureMatrix(value, input) {
  if (value === 1) {
    return "Liten kompleksitet kombinert med små konsekvenser ved feil tilsvarer tiltaksklasse 1 etter SAK10 § 9-4.";
  }
  if (value === 3) {
    return input.complexity === "high"
      ? "Høy kompleksitet eller vanskelighetsgrad tilsvarer tiltaksklasse 3 etter SAK10 § 9-4."
      : "Middels kompleksitet kombinert med store konsekvenser ved feil tilsvarer tiltaksklasse 3 etter SAK10 § 9-4.";
  }
  return "Valgt kombinasjon av kompleksitet og konsekvens tilsvarer tiltaksklasse 2 etter SAK10 § 9-4.";
}

function labelTaskType(value) {
  return {
    "fire-concept": "Brannkonsept / prosjektering av brannsikkerhet",
    "fire-detailing": "Detaljprosjektering av branntekniske ytelser",
    "independent-control": "Uavhengig kontroll av brannsikkerhet",
    "execution-follow-up": "Utførelsesoppfølging / kontroll på byggeplass",
  }[value] ?? "Brannteknisk oppgave";
}

function labelComplexity(value) {
  return { low: "Lav", medium: "Middels", high: "Høy" }[value];
}

function labelConsequence(value) {
  return { small: "små konsekvenser", medium: "middels konsekvenser", large: "store konsekvenser" }[value];
}
