window.TEK17Data = window.TEK17Data || {};

window.TEK17Data.legalReferences = {
  tek17: {
    title: "TEK17 Byggteknisk forskrift",
    tag: "TEK17",
    url: "https://www.dibk.no/regelverk/byggteknisk-forskrift-tek17",
    summary:
      "Byggteknisk forskrift (TEK17) er forskriften med tekniske krav til byggverk. For brannsikkerhet brukes særlig kapittel 11 Sikkerhet ved brann.",
  },
  tek17Guide: {
    title: "Veiledning til TEK17 kapittel 11",
    tag: "Veiledning",
    url: "https://www.dibk.no/regelverk/byggteknisk-forskrift-tek17/11",
    summary:
      "DIBK-veiledningen til kapittel 11 forklarer forskriftskravene, preaksepterte ytelser og når løsninger må dokumenteres særskilt.",
  },
  risk: {
    title: "TEK17 § 11-2 Risikoklasser",
    tag: "TEK17",
    url: "https://www.dibk.no/regelverk/byggteknisk-forskrift-tek17/11/i/11-2",
    summary:
      "Byggverk eller ulike bruksområder plasseres i risikoklasse ut fra trussel mot liv og helse. Kriteriene er personopphold, rømningsforutsetninger, overnatting og brannfare.",
  },
  riskGuide: {
    title: "Veiledning til TEK17 § 11-2",
    tag: "Veiledning",
    url: "https://www.dibk.no/regelverk/byggteknisk-forskrift-tek17/11/i/11-2",
    summary:
      "Veiledningen til § 11-2 utdyper kriteriene for risikoklasse og virksomhetstyper som normalt plasseres i de ulike risikoklassene.",
  },
  fire: {
    title: "TEK17 § 11-3 Brannklasser",
    tag: "TEK17",
    url: "https://www.dibk.no/regelverk/byggteknisk-forskrift-tek17/11/i/11-3",
    summary:
      "Byggverk eller ulike deler plasseres i brannklasse etter konsekvens ved brann. Preakseptert tabell kobler risikoklasse og totalt antall etasjer.",
  },
  fireGuide: {
    title: "Veiledning til TEK17 § 11-3",
    tag: "Veiledning",
    url: "https://www.dibk.no/regelverk/byggteknisk-forskrift-tek17/11/i/11-3",
    summary:
      "Veiledningen til § 11-3 beskriver preaksepterte ytelser, unntak, blandet bruk og forhold som kan kreve analyse eller brannklasse 4.",
  },
  mixedUse: {
    title: "TEK17 § 11-3, blandet bruk",
    tag: "TEK17",
    url: "https://www.dibk.no/regelverk/byggteknisk-forskrift-tek17/11/i/11-3",
    summary:
      "Ved blandet bruk klassifiseres delene ut fra aktuell bruk og byggets totale antall etasjer. Underliggende etasje må minst ha samme brannklasse som overliggende.",
  },
  exceptions: {
    title: "TEK17 § 11-3, unntak og BKL 4",
    tag: "TEK17",
    url: "https://www.dibk.no/regelverk/byggteknisk-forskrift-tek17/11/i/11-3",
    summary:
      "Bestemmelsen har egne unntak for enkelte bolig-, forsamlings-, salgs- og overnattingsbygg, og peker ut byggverk som må vurderes i brannklasse 4.",
  },
  section11_1: chapter11Reference("11-1", "Sikkerhet ved brann", "i"),
  section11_4: chapter11Reference("11-4", "Bæreevne og stabilitet", "ii"),
  section11_5: chapter11Reference("11-5", "Sikkerhet ved eksplosjon", "ii"),
  section11_6: chapter11Reference("11-6", "Tiltak mot brannspredning mellom byggverk", "iii"),
  section11_7: chapter11Reference("11-7", "Brannseksjoner", "iii"),
  section11_8: chapter11Reference("11-8", "Brannceller", "iii"),
  section11_9: chapter11Reference("11-9", "Materialer og produkters egenskaper ved brann", "iii"),
  section11_10: chapter11Reference("11-10", "Tekniske installasjoner", "iii"),
  section11_11: chapter11Reference("11-11", "Generelle krav om rømning og redning", "iv"),
  section11_12: chapter11Reference("11-12", "Tiltak for å påvirke rømnings- og redningstider", "iv"),
  section11_13: chapter11Reference("11-13", "Utgang fra branncelle", "iv"),
  section11_14: chapter11Reference("11-14", "Rømningsvei", "iv"),
  section11_15: chapter11Reference("11-15", "Tilrettelegging for redning av husdyr", "iv"),
  section11_16: chapter11Reference("11-16", "Tilrettelegging for manuell slokking", "v"),
  section11_17: chapter11Reference("11-17", "Tilrettelegging for rednings- og slokkemannskap", "v"),
  measure93: {
    title: "SAK10 § 9-3 Fastsettelse av tiltaksklasser",
    tag: "SAK10",
    url: "https://www.dibk.no/regelverk/sak/3/9/9-3/",
    summary:
      "Oppgaver i en byggesak deles i tiltaksklasse 1, 2 eller 3. Klassen baseres på kompleksitet, vanskelighetsgrad og mulige konsekvenser av feil.",
  },
  measure94: {
    title: "SAK10 § 9-4 Oppdeling i tiltaksklasser",
    tag: "SAK10",
    url: "https://www.dibk.no/regelverk/sak/3/9/9-4/",
    summary:
      "Tiltaksklasse 1, 2 og 3 beskrives etter økende kompleksitet og konsekvens. Tiltaksklasse fastsettes for oppgaven/fagområdet i tiltaket.",
  },
  measureGuide: {
    title: "Veiledning til SAK10 kapittel 9",
    tag: "Veiledning",
    url: "https://www.dibk.no/regelverk/sak/3/9/",
    summary:
      "Veiledningen til SAK10 kapittel 9 gir praktisk støtte for vurdering av tiltaksklasse, oppdeling i oppgaver og ansvarsfag.",
  },
};

function chapter11Reference(section, title, part) {
  return {
    title: `TEK17 § ${section} ${title} med veiledning`,
    tag: "TEK17/VTEK",
    url: `https://www.dibk.no/regelverk/byggteknisk-forskrift-tek17/11/${part}/${section}/`,
    summary: `Gjeldende forskriftskrav, veiledning og preaksepterte ytelser til TEK17 § ${section} hos Direktoratet for byggkvalitet.`,
  };
}

window.TEK17Data.libraryItems = [
  window.TEK17Data.legalReferences.tek17,
  window.TEK17Data.legalReferences.tek17Guide,
  window.TEK17Data.legalReferences.risk,
  window.TEK17Data.legalReferences.riskGuide,
  window.TEK17Data.legalReferences.fire,
  window.TEK17Data.legalReferences.fireGuide,
  window.TEK17Data.legalReferences.exceptions,
  window.TEK17Data.legalReferences.section11_1,
  window.TEK17Data.legalReferences.section11_4,
  window.TEK17Data.legalReferences.section11_5,
  window.TEK17Data.legalReferences.section11_6,
  window.TEK17Data.legalReferences.section11_7,
  window.TEK17Data.legalReferences.section11_8,
  window.TEK17Data.legalReferences.section11_9,
  window.TEK17Data.legalReferences.section11_10,
  window.TEK17Data.legalReferences.section11_11,
  window.TEK17Data.legalReferences.section11_12,
  window.TEK17Data.legalReferences.section11_13,
  window.TEK17Data.legalReferences.section11_14,
  window.TEK17Data.legalReferences.section11_15,
  window.TEK17Data.legalReferences.section11_16,
  window.TEK17Data.legalReferences.section11_17,
  window.TEK17Data.legalReferences.measure93,
  window.TEK17Data.legalReferences.measure94,
  window.TEK17Data.legalReferences.measureGuide,
  {
    title: "DIBK: Brann og konstruksjonssikkerhet",
    tag: "Fagstoff",
    url: "https://www.dibk.no/regelverk/byggteknisk-forskrift-tek17/11",
    summary: "Inngang til kapittel 11 i byggteknisk forskrift med veiledning om sikkerhet ved brann.",
  },
];
