# TEK17-Navigator

Statisk førsteversjon av TEK17 Navigator.

Applikasjonen har tre faner:

- Klassifisering av risikoklasse, brannklasse og tiltaksklasse
- TEK17-assistent med kontrollert svarflate og kildereferanser
- Hjemler og relevant fagstoff

Åpne `index.html` i nettleseren for å teste applikasjonen.

Kjør scenario-testene:

```powershell
node tests/scenario-tests.js
```

## Struktur

```txt
src/data/      regeldata, byggtyper og hjemler
src/rules/     klassifiseringslogikk
src/advisor/   kontrollert TEK17-assistent
src/ui/        kobling mellom DOM og regelmotor
```
