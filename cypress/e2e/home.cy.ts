describe("Home Page", () => {
  it("affiche le titre et permet d'ajouter une tâche", () => {
    cy.visit("/");

    cy.contains("Tâches du jour");
    cy.get("input[placeholder='Ajouter une tâche']").type("Faire les courses");
    cy.contains("Ajouter").click();
    cy.contains("Faire les courses").should("exist");
  });

  it("permet de cocher une tâche", () => {
    cy.visit("/");

    cy.get("input[placeholder='Ajouter une tâche']").type("Lire un livre");
    cy.contains("Ajouter").click();

    cy.get("input[type='checkbox']").last().check().should("be.checked");
  });
});