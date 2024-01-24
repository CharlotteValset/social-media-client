describe("logout", () => {
  it("can log out with the logout button", () => {
    cy.visit("index.html");
    cy.clearAllLocalStorage();

    cy.wait(2000);
    cy.get("button[data-bs-target='#loginModal']:visible").click({
      multiple: true,
    });
    cy.wait(2000);
    cy.get("#loginModal #loginEmail")
      .should("exist")
      .type("charlie123@noroff.no");
    cy.get("#loginModal #loginPassword").should("exist").type("charlie12345");
    cy.get("button[type='submit']:visible").click({ multiple: true });
    cy.get(window.localStorage.getItem("profile")).should("not.be.empty");
    cy.get(window.localStorage.getItem("token")).should("not.be.empty");
    cy.wait(2000);
    cy.get("button[data-auth='logout']:visible").click({ multiple: true });
    cy.wait(3000);
    cy.window().its("localStorage.profile").should("not.exist");
    cy.window().its("localStorage.token").should("not.exist");
  });
});

describe("Logout", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.clearLocalStorage();
  });

  it("will log out", () => {
    cy.visit("/");
    cy.wait(1000);
    cy.get(".btn-close:visible").click();
    cy.wait(500);
    cy.get("button[data-auth='login']:visible").click();
    cy.wait(1500);
    cy.get("input[type='email']:visible")
      .should("exist")
      .type("charlie123@noroff.no");
    cy.get("input[type='password']:visible")
      .should("exist")
      .type("charlie12345");
    cy.get(".btn-success:visible").click();
    cy.wait(3000);
    cy.then(
      () => expect(window.localStorage.getItem("profile")).to.not.be.null,
    );
    cy.then(() => expect(window.localStorage.getItem("token")).to.not.be.null);
    cy.get("button[data-auth='logout']").click();
    cy.then(() => expect(window.localStorage.getItem("profile")).to.be.null);
    cy.then(() => expect(window.localStorage.getItem("token")).to.be.null);
  });
});
