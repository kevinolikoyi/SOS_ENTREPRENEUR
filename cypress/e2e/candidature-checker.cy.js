// Tests UI du formulaire avec API interceptée (pas de dépendance au fichier de données)

describe("Formulaire CandidatureChecker — interface", () => {
  beforeEach(() => {
    cy.task("seedDataFile");
    cy.visit("/candidatures-cloturees");
  });

  after(() => {
    cy.task("cleanDataFile");
  });

  it("affiche le label, le champ et le bouton", () => {
    cy.contains("label", "Email ou téléphone").should("be.visible");
    cy.get("#candidate-identifier").should("be.visible");
    cy.get('button[type="submit"]').should("contain.text", "Vérifier");
  });

  it("met à jour la valeur du champ lors de la saisie", () => {
    cy.get("#candidate-identifier")
      .type("test@exemple.com")
      .should("have.value", "test@exemple.com");
  });

  it("vide le champ correctement", () => {
    cy.get("#candidate-identifier")
      .type("quelquechose")
      .clear()
      .should("have.value", "");
  });

  it("affiche l'état Vérification… pendant la requête", () => {
    cy.intercept("POST", "/api/candidature", (req) => {
      req.reply({ delay: 600, body: { ready: true, found: false, selected: false } });
    }).as("check");

    cy.get("#candidate-identifier").type("test@exemple.com");
    cy.get('button[type="submit"]').click();
    cy.get('button[type="submit"]')
      .should("be.disabled")
      .and("contain.text", "Vérification");
    cy.wait("@check");
    cy.get('button[type="submit"]').should("contain.text", "Vérifier");
  });

  it("affiche aucun résultat au chargement initial", () => {
    cy.get("form p").should("not.exist");
  });
});

describe("Formulaire CandidatureChecker — messages de résultat", () => {
  beforeEach(() => {
    cy.task("seedDataFile");
    cy.visit("/candidatures-cloturees");
  });

  after(() => {
    cy.task("cleanDataFile");
  });

  it("affiche Félicitations pour un candidat retenu (selected: true)", () => {
    cy.intercept("POST", "/api/candidature", {
      body: { ready: true, found: true, selected: true },
    }).as("check");

    cy.get("#candidate-identifier").type("retenu@test.com");
    cy.get('button[type="submit"]').click();
    cy.wait("@check");
    cy.contains("Félicitations").should("be.visible");
  });

  it("affiche le message en attente pour un candidat non sélectionné (pending: true)", () => {
    cy.intercept("POST", "/api/candidature", {
      body: { ready: true, found: true, selected: false, pending: true },
    }).as("check");

    cy.get("#candidate-identifier").type("nonretenu@test.com");
    cy.get('button[type="submit"]').click();
    cy.wait("@check");
    cy.contains("Votre candidature est bien enregistrée").should("be.visible");
  });

  it("affiche un avertissement pour un identifiant introuvable", () => {
    cy.intercept("POST", "/api/candidature", {
      body: { ready: true, found: false, selected: false },
    }).as("check");

    cy.get("#candidate-identifier").type("inconnu@test.com");
    cy.get('button[type="submit"]').click();
    cy.wait("@check");
    cy.contains("Nous n'avons pas trouvé").should("be.visible");
  });

  it("affiche le message d'analyse en cours (ready: false)", () => {
    cy.intercept("POST", "/api/candidature", {
      body: { ready: false, found: false, selected: false },
    }).as("check");

    cy.get("#candidate-identifier").type("quelquun@test.com");
    cy.get('button[type="submit"]').click();
    cy.wait("@check");
    cy.contains("encore en cours d'analyse").should("be.visible");
  });

  it("affiche le message d'erreur API (400) pour un champ vide", () => {
    cy.intercept("POST", "/api/candidature", {
      statusCode: 400,
      body: { message: "Entrez votre email ou votre numéro de téléphone." },
    }).as("check");

    cy.get('button[type="submit"]').click();
    cy.wait("@check");
    cy.contains("Entrez votre email").should("be.visible");
  });

  it("affiche le message de fallback en cas d'erreur réseau", () => {
    cy.intercept("POST", "/api/candidature", { forceNetworkError: true }).as("check");

    cy.get("#candidate-identifier").type("test@test.com");
    cy.get('button[type="submit"]').click();
    cy.contains("momentanément indisponible").should("be.visible");
  });
});
