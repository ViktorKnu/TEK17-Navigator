window.TEK17Advisor = window.TEK17Advisor || {};

window.TEK17Advisor.sources = [
  {
    id: "tek17",
    title: "TEK17 og brannkapitlet",
    referenceKeys: ["tek17", "tek17Guide"],
    topics: [
      "tek17",
      "byggteknisk forskrift",
      "forskrift",
      "dibk",
      "kapittel 11",
      "sikkerhet ved brann",
      "brannkapittel",
      "hva er tek17",
      "vtek",
      "veiledning",
      "preakseptert",
      "fravik",
      "problemstilling",
    ],
    shortAnswer:
      "TEK17 er byggteknisk forskrift. I denne appen er assistenten avgrenset til brannfaglige temaer, særlig kapittel 11 Sikkerhet ved brann og relevante SAK10-bestemmelser om tiltaksklasse.",
    practicalMeaning:
      "Når du spør assistenten, forsøker den å svare ut fra godkjente TEK17/SAK10-kilder og vise hvilke hjemler svaret bygger på.",
    assessmentNote:
      "Assistenten skal ikke brukes som eneste grunnlag for prosjektering. Ved konkrete byggesaker må hjemmel og veiledning kontrolleres mot DIBK og faglig vurdering.",
    vtekSearch:
      "Start med aktuell bestemmelse i TEK17 kapittel 11 og les tilhørende veiledning/preaksepterte ytelser før løsningen vurderes.",
    preacceptedPath:
      "Hvis veiledningen beskriver ytelsen som preakseptert og situasjonen ligger innenfor forutsetningene, kan løsningen normalt behandles som preakseptert.",
    outsidePreaccepted:
      "Hvis situasjonen ikke er omtalt i forskrift eller veiledning, må den behandles som et åpent vurderingspunkt, fravik eller analysebehov.",
  },
  {
    id: "risk",
    title: "Risikoklasse",
    referenceKeys: ["risk", "riskGuide"],
    topics: ["risikoklasse", "rkl", "bruk", "personopphold", "rømning", "selvredning", "overnatting", "brannfare", "vtek", "veiledning", "problemstilling"],
    shortAnswer:
      "Risikoklasse vurderes ut fra hvordan byggverket brukes og hvilken trussel brann kan gi for liv og helse.",
    practicalMeaning:
      "Se særlig på personopphold, om brukerne kjenner rømningsforholdene, om de kan bringe seg selv i sikkerhet, om det er overnatting og om brannfaren er liten.",
    assessmentNote:
      "Hvis byggtypen avviker fra tabellen eller kriteriene peker i ulike retninger, bør risikoklassen vurderes og dokumenteres av fagperson.",
    vtekSearch:
      "Se først om virksomhetstypen finnes i veiledningens tabell til TEK17 § 11-2. Deretter kontrolleres kriteriene for personopphold, rømningsforutsetninger, overnatting og brannfare.",
    preacceptedPath:
      "Hvis virksomhetstypen står i tabellen og kriteriene passer, kan risikoklassen normalt legges til grunn som preakseptert spor.",
    outsidePreaccepted:
      "Hvis bruken ikke passer tabellen, eller kriteriene peker mot en annen risikoklasse, må risikoklassen begrunnes særskilt og eventuelt overstyres manuelt.",
  },
  {
    id: "fire",
    title: "Brannklasse",
    referenceKeys: ["fire", "fireGuide"],
    topics: ["brannklasse", "bkl", "etasjer", "konsekvens", "normal tabell", "bkl 1", "bkl 2", "bkl 3", "vtek", "veiledning", "preakseptert", "problemstilling"],
    shortAnswer:
      "Brannklasse uttrykker konsekvensen en brann kan få for liv, helse, samfunnsmessige interesser og miljø.",
    practicalMeaning:
      "I normalsporet brukes risikoklasse og totalt antall etasjer. Deretter må unntak og forhold som kan gi BKL 4 vurderes.",
    assessmentNote:
      "Ved avvik fra normal tabell, blandet bruk eller store konsekvenser ved brann bør vurderingen kontrolleres særskilt.",
    vtekSearch:
      "Finn først risikoklasse og totalt antall etasjer, og sjekk deretter normal tabell og veiledning til TEK17 § 11-3.",
    preacceptedPath:
      "Hvis byggverket passer normal tabell og ingen unntak eller BKL 4-forhold slår inn, kan brannklasse normalt følge tabellen.",
    outsidePreaccepted:
      "Hvis bygget har blandet bruk, uvanlige konsekvenser, forhold under terreng eller andre særtrekk som ikke dekkes av tabellen, må løsningen vurderes nærmere.",
  },
  {
    id: "exceptions",
    title: "Unntak og BKL 4",
    referenceKeys: ["exceptions", "fireGuide"],
    topics: ["unntak", "bkl 4", "analyse", "under terreng", "samfunnsinteresser", "farlige stoffer", "kjemisk", "preakseptert", "fravik", "vtek", "veiledning", "problemstilling"],
    shortAnswer:
      "TEK17 § 11-3 har enkelte preaksepterte unntak og angir forhold der brannklasse 4 må vurderes.",
    practicalMeaning:
      "Unntak kan gi lavere brannklasse for bestemte bygg, mens forhold som byggverk under terreng, mer enn 16 etasjer eller vesentlige samfunnsinteresser kan utløse analysebehov.",
    assessmentNote:
      "Når BKL 4-forhold er aktuelle, holder det normalt ikke å bruke tabellen alene. Sikkerheten må dokumenteres ved analyse.",
    vtekSearch:
      "Sjekk de preaksepterte unntakene i veiledningen til TEK17 § 11-3 og se om alle vilkår i unntaket er oppfylt.",
    preacceptedPath:
      "Hvis situasjonen treffer et konkret unntak og alle areal-, etasje- og bruksforutsetninger er oppfylt, kan unntaket normalt brukes.",
    outsidePreaccepted:
      "Hvis situasjonen bare ligner på et unntak, eller vilkårene ikke er oppfylt, må den ikke behandles som preakseptert uten særskilt dokumentasjon.",
  },
  {
    id: "measure",
    title: "Tiltaksklasse",
    referenceKeys: ["measure93", "measure94", "measureGuide"],
    topics: ["tiltaksklasse", "tkl", "sak10", "ansvar", "prosjektering", "kontroll", "kompleksitet", "konsekvens", "veiledning", "problemstilling"],
    shortAnswer:
      "Tiltaksklasse er en SAK10-vurdering av oppgaven eller fagområdet, ikke en ren TEK17-klasse for bygget.",
    practicalMeaning:
      "Vurder kompleksitet, vanskelighetsgrad og konsekvenser av feil. Brannkonsept, fravik, analyse og kontroll kan trekke opp.",
    assessmentNote:
      "Tiltaksklasse bør knyttes til den konkrete oppgaven, for eksempel brannkonsept, detaljprosjektering eller uavhengig kontroll.",
    vtekSearch:
      "Avklar først hvilken oppgave eller hvilket ansvarsfag som vurderes, og bruk SAK10 kapittel 9 med veiledning for kompleksitet og konsekvens.",
    preacceptedPath:
      "Hvis oppgaven er enkel, oversiktlig og har små konsekvenser ved feil, kan tiltaksklasse 1 være aktuelt. Økt kompleksitet eller konsekvens trekker opp.",
    outsidePreaccepted:
      "Hvis oppgaven gjelder analyse, fravik, mange ansvarsfag eller stor konsekvens ved feil, bør tiltaksklassen vurderes høyere og dokumenteres særskilt.",
  },
  {
    id: "mixed",
    title: "Blandet bruk",
    referenceKeys: ["mixedUse", "fireGuide"],
    topics: ["blandet bruk", "flere bruk", "kombinasjon", "underliggende", "overliggende", "bruksområde", "preakseptert", "vtek", "veiledning", "problemstilling"],
    shortAnswer:
      "Ved blandet bruk bør ulike bruksområder klassifiseres hver for seg før samlet brannklasse vurderes.",
    practicalMeaning:
      "Brannklasse må vurderes med utgangspunkt i total etasjehøyde og forholdet mellom underliggende og overliggende deler.",
    assessmentNote:
      "Blandet bruk er ofte et punkt der preakseptert tabell må brukes med faglig skjønn og tydelig dokumentasjon.",
    vtekSearch:
      "Del bygget inn i bruksområder, klassifiser hver del og sjekk veiledningen til TEK17 § 11-3 om underliggende og overliggende bruk.",
    preacceptedPath:
      "Hvis bruksområdene lar seg klassifisere hver for seg og brannklassen settes etter total etasjehøyde og strengeste relevante forutsetning, kan normalsporet ofte brukes.",
    outsidePreaccepted:
      "Hvis samspillet mellom bruksområdene ikke dekkes av veiledningen, bør løsningen dokumenteres særskilt og eventuelt analyseres.",
  },
];
