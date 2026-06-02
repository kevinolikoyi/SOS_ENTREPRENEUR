describe("Redirection via le bouton Candidater ici", () => {
  it("redirige vers /candidatures-cloturees quand la campagne est fermée", () => {
    cy.visit("/");
    cy.get("#hero-cta-source").click({ force: true });
    cy.url().should("include", "/candidatures-cloturees");
  });

  it("la page /candidatures-cloturees est bien affichée après le clic", () => {
    cy.visit("/");
    cy.get("#hero-cta-source").click({ force: true });
    cy.get("h1").should("contain.text", "clôturées");
  });
});

describe("Route /postuler (campagne fermée)", () => {
  it("redirige vers /candidatures-cloturees en navigation directe", () => {
    cy.visit("/postuler");
    cy.url().should("include", "/candidatures-cloturees");
  });

  it("affiche le titre de la page clôturée après redirection", () => {
    cy.visit("/postuler");
    cy.get("h1").should("contain.text", "clôturées");
  });
});

describe("Absence de redirection automatique depuis /", () => {
  it("la home page ne redirige plus automatiquement", () => {
    cy.visit("/");
    cy.wait(2000);
    cy.url().should("eq", Cypress.config("baseUrl") + "/");
  });
});
