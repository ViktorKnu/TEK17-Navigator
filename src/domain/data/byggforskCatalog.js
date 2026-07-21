window.TEK17Data = window.TEK17Data || {};

const BYGGFORSK_BASE_URL = "https://www.byggforsk.no";
const BYGGFORSK_VERIFIED_DATE = "2026-07-21";

const byggforskEntries = [
  {
    number: "321.022",
    title: "Oversikt over krav og løsninger ved brannteknisk prosjektering av bygninger",
    version: "2.0",
    path: "/dokument/3307/oversikt_over_krav_og_loesninger_ved_brannteknisk_prosjektering_av_bygninger",
    relevantSections: ["kapittel 11"],
    topics: ["brannteknisk prosjektering", "krav", "løsninger", "dokumentasjon"],
  },
  {
    number: "321.025",
    title: "Brannsikkerhet. Prosjektering, utførelse og kontroll",
    version: "5.0",
    path: "/dokument/2998/brannsikkerhet_prosjektering_utfoerelse_og_kontroll",
    relevantSections: ["§ 11-1"],
    topics: ["prosjektering", "utførelse", "kontroll", "kvalitetssikring"],
  },
  {
    number: "321.026",
    title: "Brannsikkerhet. Brannsikkerhetsstrategi og brannkonsept",
    version: "4.1",
    path: "/dokument/3114/brannsikkerhet_brannsikkerhetsstrategi_og_brannkonsept",
    relevantSections: ["§ 11-1"],
    topics: ["brannsikkerhetsstrategi", "brannkonsept", "fravik", "analyse"],
  },
  {
    number: "321.030",
    title: "Brannteknisk oppdeling av bygninger",
    version: "6.0",
    path: "/dokument/79/brannteknisk_oppdeling_av_bygninger",
    relevantSections: ["§ 11-7", "§ 11-8"],
    topics: ["brannseksjon", "branncelle", "brannteknisk oppdeling", "brannskille"],
  },
  {
    number: "321.033",
    title: "Tilrettelegging for rednings- og slokkemannskap",
    version: "1.0",
    path: "/dokument/3066/tilrettelegging_for_rednings_og_slokkemannskap",
    relevantSections: ["§ 11-17"],
    topics: ["redningsmannskap", "slokkemannskap", "brannvesen", "atkomst"],
  },
  {
    number: "321.036",
    title: "Rømning fra bygninger ved brann",
    version: "4.2",
    path: "/dokument/5159/roemning_fra_bygninger_ved_brann",
    relevantSections: ["§§ 11-11 til 11-14"],
    topics: ["rømning", "rømningsvei", "utgang", "personsikkerhet"],
  },
  {
    number: "321.044",
    title: "Utstyr for manuell brannslokking. Typer, plassering og merking",
    version: "2.1",
    path: "/dokument/3113/utstyr_for_manuell_brannslokking_typer_plassering_og_merking",
    relevantSections: ["§ 11-16"],
    topics: ["manuell slokking", "håndslokker", "brannslange", "merking"],
  },
  {
    number: "520.320",
    title: "Brannteknisk klassifisering og dokumentasjon av bygningsdeler og byggeprodukter",
    version: "5.1",
    path: "/dokument/315/brannteknisk_klassifisering_og_dokumentasjon_av_bygningsdeler_og_byggeprodukter?version=5.1",
    relevantSections: ["§ 11-4", "§ 11-8", "§ 11-9"],
    topics: ["brannklassifisering", "bygningsdel", "byggeprodukt", "brannmotstand", "dokumentasjon"],
  },
  {
    number: "520.322",
    title: "Brannmotstand for vegger av tre, mur og betong",
    version: "4.0",
    path: "/dokument/1539/brannmotstand_for_vegger_av_tre_mur_og_betong?version=4.0",
    relevantSections: ["§ 11-4", "§ 11-8"],
    topics: ["brannmotstand", "vegg", "tre", "mur", "betong", "branncelle"],
  },
  {
    number: "520.339",
    title: "Bruk av brennbar isolasjon i bygninger",
    version: "7.1",
    path: "/dokument/3212/bruk_av_brennbar_isolasjon_i_bygninger?version=7.1",
    relevantSections: ["§ 11-9"],
    topics: ["brennbar isolasjon", "isolasjon", "materialer", "brannspredning"],
  },
  {
    number: "520.342",
    title: "Branntetting av gjennomføringer",
    version: "5.0",
    path: "/dokument/316/branntetting_av_gjennomfoeringer?version=5.0",
    relevantSections: ["§ 11-8", "§ 11-10"],
    topics: ["branntetting", "gjennomføring", "brannskille", "kabel", "rør", "ventilasjonskanal"],
  },
  {
    number: "520.380",
    title: "Røykkontroll i bygninger",
    version: "2.1",
    path: "/dokument/321/roeykkontroll_i_bygninger?version=2.1",
    relevantSections: ["§ 11-10", "§ 11-12"],
    topics: ["røykkontroll", "røykventilasjon", "røykspredning", "ventilasjon"],
  },
  {
    number: "520.385",
    title: "Nødvendig rømningstid ved brann",
    version: "3.1",
    path: "/dokument/322/noedvendig_roemningstid_ved_brann?version=3.1",
    relevantSections: ["§§ 11-11 til 11-14"],
    topics: ["nødvendig rømningstid", "rømningstid", "rømning", "analyse", "personsikkerhet"],
  },
  {
    number: "550.361",
    title: "Sprinkleranlegg",
    version: "2.0",
    path: "/dokument/510/sprinkleranlegg?version=2.0",
    relevantSections: ["§ 11-12"],
    topics: ["sprinkler", "sprinkleranlegg", "automatisk slokkeanlegg", "slokkeanlegg"],
  },
];

window.TEK17Data.byggforskCatalog = byggforskEntries.map((entry) => ({
  ...entry,
  id: `byggforsk-${entry.number.replace(".", "-")}`,
  section: `Byggforsk ${entry.number}`,
  paragraph: "Offentlig katalogmetadata",
  sourceType: "faglig-anvisning",
  publisher: "SINTEF",
  accessStatus: "Krever ekstern tilgang",
  verifiedDate: BYGGFORSK_VERIFIED_DATE,
  url: `${BYGGFORSK_BASE_URL}${entry.path}`,
  summary: `Faglig anvisning fra SINTEF, katalogført som relevant for TEK17 ${entry.relevantSections.join(", ")}.`,
  phrases: [entry.number, entry.title],
}));

window.TEK17Data.libraryItems.push(
  {
    title: "Om Byggforskserien",
    tag: "Kildeinformasjon",
    kind: "byggforsk",
    url: "https://www.byggforsk.no/side/198/hva_er_byggforskserien",
    summary:
      "SINTEFs informasjon om Byggforskserien. Anvisningene er faglige hjelpemidler og må ikke forveksles med forskriftskrav eller preaksepterte ytelser.",
  },
  ...window.TEK17Data.byggforskCatalog.map((entry) => ({
    title: `${entry.number} ${entry.title}`,
    tag: "SINTEF Byggforsk",
    kind: "byggforsk",
    url: entry.url,
    summary: entry.summary,
    number: entry.number,
    version: entry.version,
    accessStatus: entry.accessStatus,
  })),
);
