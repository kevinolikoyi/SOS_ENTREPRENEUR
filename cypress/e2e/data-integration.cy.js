// Tests E2E complets : flux réel sans interception API
// Le fichier data/candidatures-retenues.json est injecté via cy.task()

describe("Intégration Excel/JSON — candidat retenu", () => {
  before(() => {
    cy.task("seedDataFile");
  });

  after(() => {
    cy.task("cleanDataFile");
  });

  it("trouve un candidat retenu par email et affiche Félicitations", () => {
    cy.visit("/candidatures-cloturees");
    cy.get("#candidate-identifier").type("retenu@test.com");
    cy.get('button[type="submit"]').click();
    cy.contains("Félicitations").should("be.visible");
  });

  it("trouve le même candidat par numéro de téléphone", () => {
    cy.visit("/candidatures-cloturees");
    cy.get("#candidate-identifier").type("97000001");
    cy.get('button[type="submit"]').click();
    cy.contains("Félicitations").should("be.visible");
  });
});

describe("Intégration Excel/JSON — candidat non retenu", () => {
  before(() => {
    cy.task("seedDataFile");
  });

  after(() => {
    cy.task("cleanDataFile");
  });

  it("identifie un candidat présent mais non sélectionné (par email)", () => {
    cy.visit("/candidatures-cloturees");
    cy.get("#candidate-identifier").type("nonretenu@test.com");
    cy.get('button[type="submit"]').click();
    cy.contains("Votre candidature est bien enregistrée").should("be.visible");
  });

  it("identifie un candidat présent mais non sélectionné (par téléphone)", () => {
    cy.visit("/candidatures-cloturees");
    cy.get("#candidate-identifier").type("97000002");
    cy.get('button[type="submit"]').click();
    cy.contains("Votre candidature est bien enregistrée").should("be.visible");
  });
});

describe("Intégration Excel/JSON — identifiant inconnu", () => {
  before(() => {
    cy.task("seedDataFile");
  });

  after(() => {
    cy.task("cleanDataFile");
  });

  it("signale un email introuvable dans le fichier", () => {
    cy.visit("/candidatures-cloturees");
    cy.get("#candidate-identifier").type("inconnu@test.com");
    cy.get('button[type="submit"]').click();
    cy.contains("Nous n'avons pas trouvé").should("be.visible");
  });

  it("signale un numéro de téléphone inconnu", () => {
    cy.visit("/candidatures-cloturees");
    cy.get("#candidate-identifier").type("90000000");
    cy.get('button[type="submit"]').click();
    cy.contains("Nous n'avons pas trouvé").should("be.visible");
  });
});

describe("Intégration Excel/JSON — sans fichier de données", () => {
  before(() => {
    cy.task("cleanDataFile");
  });

  it("la page affiche le message d'attente (pas de formulaire)", () => {
    cy.visit("/candidatures-cloturees");
    cy.contains("en cours d'analyse").should("be.visible");
    cy.get("#candidate-identifier").should("not.exist");
  });

  it("l'API retourne ready: false sans fichier", () => {
    cy.request({
      method: "POST",
      url: "/api/candidature",
      body: { identifier: "retenu@test.com" },
    }).then((res) => {
      expect(res.body.ready).to.be.false;
    });
  });
});

describe("Intégration Excel/JSON — rechargement après ajout du fichier", () => {
  it("passe du mode attente au mode vérification après ajout du fichier", () => {
    cy.task("cleanDataFile");
    cy.visit("/candidatures-cloturees");
    cy.contains("en cours d'analyse").should("be.visible");
    cy.get("#candidate-identifier").should("not.exist");

    cy.task("seedDataFile");
    cy.reload();

    cy.get("#candidate-identifier").should("be.visible");
    cy.contains("en cours d'analyse").should("not.exist");
  });

  after(() => {
    cy.task("cleanDataFile");
  });
});
