window.TEK17Rules = window.TEK17Rules || {};

window.TEK17Rules.classifyFire = function classifyFire(input, usage, riskResult, fireClassTable, legalReferences) {
  const legalBasis = [legalReferences.fire];
  const bkl4Triggers = [
    input.totalFloors > 16 && "Byggverket har mer enn 16 etasjer.",
    input.mainlyBelowGround && "Byggverket ligger i hovedsak under terreng.",
    input.criticalInfrastructure && "Brann kan ramme vesentlige samfunnsinteresser.",
    input.chemicalOrHazardousProduction && "Byggverket gjelder kjemisk industri eller miljøfarlig produksjon.",
    input.storesHazardousSubstances && "Byggverket lagrer særlig farlige stoffer.",
  ].filter(Boolean);

  if (bkl4Triggers.length) {
    return {
      normalValue: getNormalFireClass(riskResult.value, input.totalFloors, fireClassTable),
      finalValue: 4,
      confidence: "requires-analysis",
      reasons: [
        ...bkl4Triggers,
        "Konsekvensen ved brann kan bli særlig stor, og sikkerheten må dokumenteres ved analyse.",
      ],
      legalBasis: [...legalBasis, legalReferences.exceptions],
    };
  }

  const normalValue = getNormalFireClass(riskResult.value, input.totalFloors, fireClassTable);
  let finalValue = normalValue;
  let confidence = "preaccepted";
  const reasons = [`Normal tabell gir ${formatFireClass(normalValue)} for RKL ${riskResult.value} og ${input.totalFloors} etasje(r).`];

  const exception = findFireClassException(usage, riskResult.value, input);
  if (exception) {
    finalValue = exception.value;
    confidence = "preaccepted-exception";
    reasons.push(exception.reason);
    legalBasis.push(legalReferences.exceptions);
  }

  return {
    normalValue,
    finalValue,
    confidence,
    reasons,
    legalBasis,
  };
};

function getNormalFireClass(riskClass, floors, fireClassTable) {
  const floorKey = floors === 1 ? 1 : floors === 2 ? 2 : floors <= 4 ? "3-4" : "5+";
  return fireClassTable[riskClass][floorKey];
}

function findFireClassException(usage, riskClass, input) {
  if (usage.id === "bolig" && riskClass === 4 && input.totalFloors === 3 && input.directToTerrain) {
    return {
      value: 1,
      reason: "Boligbygning i RKL 4 med tre etasjer kan oppføres i BKL 1 når hver boenhet har direkte utgang til terreng.",
    };
  }

  if (
    ["salgslokale", "forsamlingslokale"].includes(usage.id) &&
    input.totalFloors <= 2 &&
    input.grossAreaPerFloor < 800
  ) {
    return {
      value: 1,
      reason: "Forsamlingslokale eller salgslokale med høyst to etasjer og bruttoareal under 800 m2 per etasje kan oppføres i BKL 1.",
    };
  }

  if (usage.id === "hotell" && input.totalFloors <= 2 && input.grossAreaPerFloor < 300) {
    return {
      value: 1,
      reason: "Overnattingsbygning med høyst to etasjer og bruttoareal under 300 m2 per etasje kan oppføres i BKL 1.",
    };
  }

  if (riskClass === 6 && input.totalFloors === 2 && input.rkl6DwellingTwoFloors) {
    return {
      value: 1,
      reason: "Boligbygning i RKL 6 i to etasjer kan etter unntak oppføres i BKL 1.",
    };
  }

  return null;
}

function formatFireClass(value) {
  return value ? `BKL ${value}` : "Ingen BKL";
}
