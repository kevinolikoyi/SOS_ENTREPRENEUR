describe("Page d'accueil", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("se charge à la racine sans redirection automatique", () => {
    cy.url().should("eq", Cypress.config("baseUrl") + "/");
  });

  it("reste à la racine 2 secondes après chargement (aucun redirect JS)", () => {
    cy.wait(2000);
    cy.url().should("eq", Cypress.config("baseUrl") + "/");
  });

  it("affiche un titre h1 visible", () => {
    cy.get("h1").should("exist").and("be.visible");
  });

  it("contient au moins un bouton Candidater ici pointant vers /postuler", () => {
    cy.contains("a", "Candidater ici")
      .should("have.attr", "href", "/postuler")
      .and("be.visible");
  });

  it("affiche au moins 4 sections dans le main", () => {
    cy.get("main > section").should("have.length.at.least", 4);
  });
});
