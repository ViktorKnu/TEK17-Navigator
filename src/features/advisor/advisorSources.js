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
    keyPoints: [
      "Preaksepterte ytelser i veiledningen er ett dokumentert spor for å oppfylle forskriftens funksjonskrav.",
      "Løsninger utenfor de preaksepterte ytelsene må dokumenteres ved analyse som viser at funksjonskravet er oppfylt.",
      "Forutsetninger som bruk, personer, areal, etasjer, brannenergi og særskilt risiko må beskrives.",
    ],
  },
  {
    id: "risk",
    title: "Risikoklasse",
    referenceKeys: ["risk", "riskGuide"],
    topics: ["risikoklasse", "rkl", "bruk", "personopphold", "rømning", "selvredning", "overnatting", "brannfare", "hotell", "skole", "barnehage", "bolig", "kontor", "lager", "sykehjem"],
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
    keyPoints: [
      "RKL 1: sporadisk opphold, kjente rømningsforhold og selvredning, ikke overnatting og liten brannfare.",
      "RKL 2: kjente rømningsforhold og selvredning, ikke overnatting og ikke liten brannfare.",
      "RKL 3: regelmessig opphold, kjente rømningsforhold og selvredning, ikke overnatting og liten brannfare.",
      "RKL 4: regelmessig opphold, kjente rømningsforhold og selvredning, overnatting og liten brannfare.",
      "RKL 5: regelmessig opphold, ikke kjente rømningsforhold eller selvredning, ikke overnatting og liten brannfare.",
      "RKL 6: regelmessig opphold, ikke kjente rømningsforhold eller selvredning, overnatting og liten brannfare.",
      "Virksomheter uten tabelltreff, eller der forutsetningene avviker, krever en begrunnet og dokumentert vurdering.",
    ],
  },
  {
    id: "fire",
    title: "Brannklasse",
    referenceKeys: ["fire", "fireGuide"],
    topics: ["brannklasse", "bkl", "etasjer", "konsekvens", "normal tabell", "bkl 1", "bkl 2", "bkl 3", "høyde", "risikoklasse"],
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
    keyPoints: [
      "Normal tabell bruker aktuell risikoklasse og byggverkets totale antall etasjer.",
      "RKL 1 gir ingen BKL i én etasje, BKL 1 i to etasjer og BKL 2 fra tre etasjer.",
      "RKL 2-4 gir BKL 1 i én til to etasjer, BKL 2 i tre til fire etasjer og BKL 3 fra fem etasjer.",
      "RKL 5 gir BKL 1 i én etasje, BKL 2 i to etasjer og BKL 3 fra tre etasjer.",
      "RKL 6 gir BKL 1 i én etasje, BKL 2 i to til fire etasjer og BKL 3 fra fem etasjer.",
    ],
  },
  {
    id: "exceptions",
    title: "Unntak og BKL 4",
    referenceKeys: ["exceptions", "fireGuide"],
    topics: ["unntak", "bkl 4", "analyse", "under terreng", "samfunnsinteresser", "farlige stoffer", "kjemisk", "fravik", "forsamlingslokale", "salgslokale", "overnattingsbygning", "hotell", "direkte terreng"],
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
    keyPoints: [
      "Bolig i RKL 4 med tre etasjer kan være BKL 1 når hver boenhet har direkte utgang til terreng uten trapp eller trapperom.",
      "Forsamlings- og salgslokaler med høyst to etasjer og under 800 m2 per etasje kan være BKL 1.",
      "Overnattingsbygg med høyst to etasjer og under 300 m2 i hver etasje kan være BKL 1.",
      "Boligbygning i RKL 6 med to etasjer kan være BKL 1.",
      "Særlig store konsekvenser gir BKL 4 og krever analyse; eksempler er mer enn 16 etasjer, vesentlige samfunnsinteresser, hovedsakelig under terreng og særlig farlig produksjon eller lagring.",
    ],
  },
  {
    id: "measure",
    title: "Tiltaksklasse",
    referenceKeys: ["measure93", "measure94", "measureGuide"],
    topics: ["tiltaksklasse", "tkl", "sak10", "ansvar", "prosjektering", "kontroll", "kompleksitet", "konsekvens", "vanskelighetsgrad", "kommune", "ansvarlig søker", "brannkonsept"],
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
    keyPoints: [
      "TKL 1: liten kompleksitet og vanskelighetsgrad, med små konsekvenser ved feil.",
      "TKL 2: liten kompleksitet med middels til store konsekvenser, eller middels kompleksitet med små til middels konsekvenser.",
      "TKL 3: middels kompleksitet med store konsekvenser, eller høy kompleksitet og vanskelighetsgrad.",
      "Risikoklasse, brannklasse og analysebehov er relevante vurderingsmomenter, men fastsetter ikke tiltaksklassen automatisk.",
      "Ansvarlig søker foreslår tiltaksklasse, mens kommunen fastsetter den.",
    ],
  },
  {
    id: "mixed",
    title: "Blandet bruk",
    referenceKeys: ["mixedUse", "fireGuide"],
    topics: ["blandet bruk", "flere bruk", "kombinasjon", "underliggende", "overliggende", "bruksområde", "etasjer", "høyde"],
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
    keyPoints: [
      "Hvert bruksområde klassifiseres ut fra sin aktuelle bruk og byggverkets totale antall etasjer.",
      "En underliggende etasje må ha minst samme brannklasse som etasjen over.",
    ],
  },
];
