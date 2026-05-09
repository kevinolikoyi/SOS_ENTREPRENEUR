describe("Page /candidatures-cloturees — sans fichier de données", () => {
  before(() => {
    cy.task("cleanDataFile");
  });

  beforeEach(() => {
    cy.visit("/candidatures-cloturees");
  });

  it("affiche le titre principal avec le mot clôturées", () => {
    cy.get("h1").should("contain.text", "clôturées");
  });

  it("affiche la date de clôture de la session", () => {
    cy.contains("9 mai 2026 à 00 h").should("be.visible");
  });

  it("affiche le message d'attente (résultats non disponibles)", () => {
    cy.contains("en cours d'analyse").should("be.visible");
  });

  it("n'affiche pas le formulaire de vérification", () => {
    cy.get("#candidate-identifier").should("not.exist");
    cy.contains("Vérifier").should("not.exist");
  });
});

describe("Page /candidatures-cloturees — avec fichier de données", () => {
  before(() => {
    cy.task("seedDataFile");
  });

  after(() => {
    cy.task("cleanDataFile");
  });

  beforeEach(() => {
    cy.visit("/candidatures-cloturees");
  });

  it("affiche le message de disponibilité des résultats", () => {
    cy.contains("résultats de présélection sont disponibles").should("be.visible");
  });

  it("affiche le champ de saisie email/téléphone", () => {
    cy.get("#candidate-identifier")
      .should("be.visible")
      .and("have.attr", "placeholder", "ex: 97000000 ou nom@email.com");
  });

  it("affiche le bouton Vérifier", () => {
    cy.get('button[type="submit"]').should("contain.text", "Vérifier");
  });

  it("affiche toujours la date de clôture", () => {
    cy.contains("9 mai 2026 à 00 h").should("be.visible");
  });

  it("n'affiche plus le message d'attente", () => {
    cy.contains("en cours d'analyse").should("not.exist");
  });
});
