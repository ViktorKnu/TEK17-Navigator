# TEK17 Navigator

TEK17 Navigator er en nett- og desktopapp for brannteknisk orientering i TEK17 og SAK10.

Appen samler tre arbeidsflater:

- TEK17-assistent med kildebundne svar
- klassifisering av risikoklasse, brannklasse og tiltaksklasse
- hjemler, veiledning og relevant fagstoff

Målet er ikke å erstatte faglig vurdering, men å gjøre det raskere å finne riktig spor, se aktuelle hjemler og dokumentere hvorfor en vurdering peker i en bestemt retning.

## Kostnadsprinsipp

TEK17 Navigator skal kunne utvikles, bygges, distribueres og brukes uten betalte tjenester eller løpende kostnader.

- ingen betalte LLM-API-er, skytjenester eller abonnementer
- lokal AI via Ollama og fritt tilgjengelige modellvekter
- GitHub Pages, Actions og Releases brukes bare innenfor kostnadsfrie rammer
- ingen kjøp av sertifikat for Windows-kodesignering

Desktopfilene distribueres derfor usignert. Windows kan vise et SmartScreen-varsel ved første oppstart. Et eget appikon kan fortsatt lages og brukes kostnadsfritt. Dersom en tjeneste eller modell senere krever betaling, skal den ikke bli en nødvendig del av appen.

## Nettversjon

Den publiserte webappen ligger her:

```txt
https://viktorknu.github.io/TEK17-Navigator/
```

GitHub Pages oppdateres fra `main` via prosjektets Pages-workflow. Nettversjonen kan brukes til klassifisering og kildebaserte assistentsvar uten installasjon.

Lokal LLM i nettversjonen krever at Ollama kjører på brukerens egen maskin. Ved bruk fra GitHub Pages kan Ollama måtte startes med:

```powershell
$env:OLLAMA_ORIGINS="https://viktorknu.github.io"
ollama serve
```

## Desktopversjon

Desktopappen bygges med Electron og bruker samme fagdata og UI som nettversjonen.

Siste desktopversjon kan lastes ned fra:

```txt
https://github.com/ViktorKnu/TEK17-Navigator/releases/latest
```

Release-siden inneholder normalt:

- installer for Windows
- portable Windows-app

Desktopappen forsøker å starte Ollama automatisk hvis `ollama.exe` finnes på maskinen. Ollama må likevel være installert for at lokal LLM skal fungere.

## Lokal Utvikling

Installer avhengigheter:

```powershell
npm install
```

Start lokal nettversjon:

```powershell
npm run serve
```

Åpne deretter:

```txt
http://127.0.0.1:5173
```

Start desktopappen lokalt:

```powershell
npm run desktop
```

Bygg desktopappen:

```powershell
npm run desktop:build
```

Ferdige desktopfiler legges i:

```txt
dist/desktop/
```

## Release

Desktop-release bygges av GitHub Actions når en versjonstag pushes, for eksempel:

```powershell
git tag -a v1.5.0 -m "TEK17 Navigator v1.5.0"
git push origin v1.5.0
```

Workflowen bygger Windows-app og publiserer filene på GitHub Releases.

## Lokal LLM

TEK17-assistenten kan bruke en lokal Ollama-modell:

```powershell
ollama serve
```

Modell velges i appen. Nedlasting starter bare når brukeren trykker **Klargjør assistent**.

Appen bruker Ollama-endepunktene:

- `GET /api/tags` for å sjekke lokale modeller
- `POST /api/pull` for å hente modellen hvis den mangler
- `POST /api/chat` for lokale svar

Hvis Ollama ikke svarer, faller assistenten tilbake til kildebaserte svar uten LLM.

## Modellvalg og Responstid

Appen tilbyr bare modeller som er laget for norsk eller har dokumentert flerspråklig støtte. Standardvalget er `qwen3:4b-instruct` fordi det gir en bedre balanse mellom norsk språk, kvalitet og responstid enn den tidligere standardmodellen `llama3.1:8b`.

| Modell | Passer best til | Fordel | Vær obs på |
| --- | --- | --- | --- |
| `qwen3:4b-instruct` | Raske svar på vanlige PC-er | Bokmål, nynorsk og lav ressursbruk | Mindre kapasitet ved sammensatte saker |
| `gemma3:4b` | Balansert allroundbruk | Instruksjoner og oppsummering | Litt tregere og ikke norsktilpasset |
| `NbAiLab/borealis-instruct-preview:4b` | Utprøving av norsk språk | Norsktilpasset og moderat størrelse | Forhåndsversjon med mindre testing |
| `qwen3:8b` | Grundigere svar på sterkere PC-er | Mer kapasitet og norskstøtte | Krever mer minne og tid |
| `gemma3:12b` | Komplekse spørsmål og lange kilder | Sterk generell svarkvalitet | Høyt minnebehov og ikke norsktilpasset |
| `NbAiLab/borealis-instruct-preview:12b` | Krevende spørsmål med norsk språkfokus | Større norsktilpasset modell | Forhåndsversjon og svært ressurskrevende |

Appen viser i tillegg nedlastingsstørrelse, anbefalt maskinvare og flere konkrete fordeler og begrensninger når en modell velges.

Qwen 3 støtter bokmål og nynorsk. Gemma 3 4B/12B har støtte for over 140 språk. Borealis er norsktilpasset av Nasjonalbibliotekets AI-lab, men er foreløpig publisert som en forhåndsversjon.

Modellkilder: [Qwen 3](https://qwenlm.github.io/blog/qwen3/), [Gemma 3](https://ai.google.dev/gemma/docs/core/model_card_3) og [Borealis Preview](https://huggingface.co/collections/NbAiLab/borealis-preview).

Faktisk hastighet avhenger særlig av RAM, CPU og GPU. Første svar etter oppstart tar normalt lengre tid enn neste svar fordi modellen først må lastes i minnet. Qwen 8B kjøres uten tenkemodus i appen for å redusere ventetiden.

En lokal sammenligning på en PC med Intel Core i7-1360P, 16 GB RAM og integrert grafikk viste at den optimaliserte Qwen 3 4B-profilen svarte på omtrent 51 sekunder ved kald start og 23 sekunder når modellen var varm. Llama 3.1 8B brukte omtrent 78 og 38 sekunder på samme problemstilling. Resultatene vil variere mellom maskiner, men målingen støtter Qwen 3 4B som raskt standardvalg.

For å holde responstiden nede og redusere frie tillegg er lokale svar begrenset til 240 genererte tokens og maksimalt seks korte linjer. Modellen instrueres til ikke å legge til eksempler eller kontrollpunkter som ikke står uttrykkelig i kildegrunnlaget.

## Faglig Avgrensning

Assistenten skal bare svare fra kilder som er lagt inn i appen. RAG-grunnlaget dekker hele TEK17 kapittel 11 og deler inn stoffet i mindre kildebiter etter paragraf, ledd eller tema. Hver kildebit er merket som forskriftskrav, veiledning eller preakseptert ytelse. Appens egne vurderingspåminnelser vises separat som faglige merknader.

### Byggforskserien

Appen har en kostnadsfri katalog med offentlig metadata for 14 branntekniske Byggforsk-anvisninger, kontrollert 21. juli 2026. Katalogen inneholder anvisningsnummer, tittel, versjon, tema, relevant TEK17-paragraf, tilgangsstatus og lenke til SINTEF. Den inneholder ikke fulltekst, tabeller, tegninger eller annet abonnementsinnhold.

Byggforsk vises bare som faglig fordypning. En anvisning er ikke automatisk et forskriftskrav eller en preakseptert ytelse, og brukes derfor ikke som juridisk svargrunnlag av den lokale språkmodellen. Inntil tre relevante katalogtreff kan sendes til Ollama med nummer, tittel, versjon, tema, TEK17-relevans, tilgangsstatus og lenke. Modellen skal velge høyst én anvisning å nevne, opplyse at fullteksten krever ekstern tilgang og aldri anta hva fullteksten sier eller bruke anvisningen som dokumentasjon på forskriftsoppfyllelse. Fulltekst må åpnes hos Byggforsk.

Katalogen bygger på SINTEFs offentlige [oversikt over brannanvisninger](https://www.byggforsk.no/innhold/588/brann). Se også [om Byggforskserien](https://www.byggforsk.no/side/198/hva_er_byggforskserien) og [abonnementsvilkårene](https://www.byggforsk.no/file/index/5375).

Kildegrunnlaget omfatter blant annet:

- TEK17 §§ 11-1 til 11-17 med veiledning
- risikoklasse, brannklasse, unntak og blandet bruk
- bæreevne, eksplosjon, brannspredning, seksjonering og brannceller
- materialer, isolasjon, tekniske installasjoner og gjennomføringer
- rømning, aktive tiltak, utganger og rømningsveier
- manuell slokking og tilrettelegging for brannvesenet
- SAK10 kapittel 9 om tiltaksklasser

Kildesøket prioriterer eksplisitte paragrafhenvisninger, faguttrykk og fraser. Det støtter vanlige synonymer, avviser svake enkelttreff og henter dynamisk opptil seks kildebiter når en problemstilling berører flere temaer.

Samtalen sender de siste brukerproblemstillingene videre som kontekst til neste spørsmål. Tiltaksklasse foreslås fra valgt kombinasjon av kompleksitet/vanskelighetsgrad og konsekvens etter SAK10 § 9-4. RKL, BKL og analysebehov er vurderingsmomenter, ikke automatiske hopp til en bestemt tiltaksklasse.

Ved konkrete byggesaker må svar og klassifisering alltid kontrolleres mot DIBK og faglig vurdering.

## Tester

Kjør hele testpakken:

```powershell
npm test
```

Testene dekker:

- klassifiseringsscenarioer for RKL, BKL og TKL
- assistentens kildesøk
- fallback når spørsmålet er utenfor kildegrunnlaget
- lokal LLM-integrasjon mot mockede Ollama-kall

## Prosjektstruktur

```txt
TEK17-Navigator/
|-- .github/workflows/          GitHub Pages og desktop-release
|-- tools/                      Lokale utviklingsverktøy
|-- src/
|   |-- app/                    UI, faner og DOM-kobling
|   |-- desktop/                Electron-wrapper
|   |-- domain/
|   |   |-- data/               Byggtyper, tabeller, hjemler og veiledning
|   |   `-- rules/              Klassifiseringslogikk
|   `-- features/
|       `-- advisor/            TEK17-assistent, RAG og lokal LLM
|-- tests/                      Scenario- og assistenttester
|-- index.html                  Hovedside
|-- styles.css                  Styling
|-- package.json                NPM-scripts og desktop-build
`-- README.md
```
