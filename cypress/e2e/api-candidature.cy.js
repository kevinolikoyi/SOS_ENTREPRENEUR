// Tests directs de l'endpoint POST /api/candidature via cy.request()

describe("API /api/candidature — validation de l'entrée", () => {
  it("retourne 400 sans corps de requête", () => {
    cy.request({
      method: "POST",
      url: "/api/candidature",
      body: {},
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.status).to.eq(400);
      expect(res.body.message).to.include("Entrez votre email");
    });
  });

  it("retourne 400 avec un identifiant blanc", () => {
    cy.request({
      method: "POST",
      url: "/api/candidature",
      body: { identifier: "   " },
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.status).to.eq(400);
    });
  });
});

describe("API /api/candidature — sans fichier de données", () => {
  before(() => {
    cy.task("cleanDataFile");
  });

  it("retourne ready: false pour tout identifiant", () => {
    cy.request({
      method: "POST",
      url: "/api/candidature",
      body: { identifier: "test@test.com" },
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.ready).to.be.false;
      expect(res.body.found).to.be.false;
      expect(res.body.selected).to.be.false;
    });
  });
});

describe("API /api/candidature — avec fichier de données JSON", () => {
  before(() => {
    cy.task("seedDataFile");
  });

  after(() => {
    cy.task("cleanDataFile");
  });

  it("retourne selected: true pour un email retenu", () => {
    cy.request({
      method: "POST",
      url: "/api/candidature",
      body: { identifier: "retenu@test.com" },
    }).then((res) => {
      expect(res.body.ready).to.be.true;
      expect(res.body.found).to.be.true;
      expect(res.body.selected).to.be.true;
    });
  });

  it("retourne selected: true pour le numéro de téléphone du même candidat", () => {
    cy.request({
      method: "POST",
      url: "/api/candidature",
      body: { identifier: "97000001" },
    }).then((res) => {
      expect(res.body.found).to.be.true;
      expect(res.body.selected).to.be.true;
    });
  });

  it("normalise les numéros avec espaces (97 00 00 01 → 97000001)", () => {
    cy.request({
      method: "POST",
      url: "/api/candidature",
      body: { identifier: "97 00 00 01" },
    }).then((res) => {
      expect(res.body.found).to.be.true;
      expect(res.body.selected).to.be.true;
    });
  });

  it("normalise les numéros avec tirets (97-000-001 → 97000001)", () => {
    cy.request({
      method: "POST",
      url: "/api/candidature",
      body: { identifier: "97-000-001" },
    }).then((res) => {
      expect(res.body.found).to.be.true;
      expect(res.body.selected).to.be.true;
    });
  });

  it("retourne pending: true pour un email présent mais non retenu", () => {
    cy.request({
      method: "POST",
      url: "/api/candidature",
      body: { identifier: "nonretenu@test.com" },
    }).then((res) => {
      expect(res.body.ready).to.be.true;
      expect(res.body.found).to.be.true;
      expect(res.body.selected).to.be.false;
      expect(res.body.pending).to.be.true;
    });
  });

  it("retourne found: false pour un email inconnu", () => {
    cy.request({
      method: "POST",
      url: "/api/candidature",
      body: { identifier: "inconnu@test.com" },
    }).then((res) => {
      expect(res.body.ready).to.be.true;
      expect(res.body.found).to.be.false;
      expect(res.body.selected).to.be.false;
    });
  });

  it("retourne found: false pour un téléphone inconnu", () => {
    cy.request({
      method: "POST",
      url: "/api/candidature",
      body: { identifier: "99999999" },
    }).then((res) => {
      expect(res.body.found).to.be.false;
    });
  });
});
