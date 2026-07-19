window.TEK17Advisor = window.TEK17Advisor || {};

window.TEK17Advisor.buildAnswer = function buildAnswer(question, matchedSources, legalReferences) {
  if (!question.trim()) {
    return `<p class="assistant-empty">Skriv inn et spørsmål først.</p>`;
  }

  if (!matchedSources.length) {
    return `
      <section>
        <h3>Utenfor kildegrunnlaget</h3>
        <p><strong>Kort svar:</strong> Dette spørsmålet treffer ikke de TEK17/SAK10-kildene som er koblet til assistenten ennå.</p>
        <p><strong>VTEK-sjekk:</strong> Appen har ikke nok lokalt kildegrunnlag til å si om situasjonen er preakseptert.</p>
        <p><strong>Neste steg:</strong> Slå opp aktuell bestemmelse og veiledning hos DIBK, og dokumenter eventuelt fravik/analyse hvis løsningen ikke står som preakseptert ytelse.</p>
        <p><strong>Hva du kan spørre om:</strong> Prøv risikoklasse, brannklasse, tiltaksklasse, blandet bruk, unntak, BKL 4 eller hva TEK17 er.</p>
      </section>
      ${boundaryNote()}
    `;
  }

  return `
    ${matchedSources.map((source) => renderSourceAnswer(source, legalReferences)).join("")}
    ${boundaryNote()}
  `;
};

function renderSourceAnswer(source, legalReferences) {
  const refs = getReferences(source, legalReferences);

  return `
    <section>
      <h3>${source.title}</h3>
      <p><strong>Kildetype:</strong> ${sourceTypeLabel(source.sourceType)}${source.section ? ` · ${source.section}` : ""}${source.paragraph ? ` · ${source.paragraph}` : ""}</p>
      <p><strong>Kort svar:</strong> ${source.shortAnswer}</p>
      ${renderProblemAssessment(source)}
      ${renderKeyPoints(source)}
      <p><strong>I praksis:</strong> ${source.practicalMeaning}</p>
      <p><strong>Faglig merknad:</strong> ${source.assessmentNote}</p>
      <div class="source-list">
        ${refs.map(referenceLink).join("")}
      </div>
    </section>
  `;
}

function sourceTypeLabel(sourceType) {
  return {
    "forskriftskrav": "Forskriftskrav",
    "veiledning": "Veiledning",
    "preakseptert-ytelse": "Preakseptert ytelse",
  }[sourceType] ?? "Kildegrunnlag";
}

function renderKeyPoints(source) {
  if (!source.keyPoints?.length) return "";
  return `
    <div class="problem-assessment">
      <p><strong>Relevant forskrift og veiledning:</strong></p>
      <ul>${source.keyPoints.map((point) => `<li>${point}</li>`).join("")}</ul>
    </div>
  `;
}

function renderProblemAssessment(source) {
  if (!source.vtekSearch && !source.preacceptedPath && !source.outsidePreaccepted) return "";

  return `
    <div class="problem-assessment">
      <p><strong>Sjekk i VTEK/veiledning:</strong> ${source.vtekSearch}</p>
      <p><strong>Preakseptert spor:</strong> ${source.preacceptedPath}</p>
      <p><strong>Hvis det ikke står der:</strong> ${source.outsidePreaccepted}</p>
    </div>
  `;
}

function getReferences(source, legalReferences) {
  const keys = source.referenceKeys ?? [source.referenceKey];
  return keys.map((key) => legalReferences[key]).filter(Boolean);
}

function referenceLink(ref) {
  return `<p class="source-line"><span>${ref.tag}</span><a href="${ref.url}" target="_blank" rel="noreferrer">${ref.title}</a></p>`;
}

function boundaryNote() {
  return `<p class="field-note">Assistenten søker bare i kildegrunnlaget som er lagt inn i appen. Hvis en problemstilling ikke finnes der, skal den markeres som ikke avklart i VTEK-grunnlaget, ikke fylles ut med antakelser.</p>`;
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (char) => {
    return {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    }[char];
  });
}
