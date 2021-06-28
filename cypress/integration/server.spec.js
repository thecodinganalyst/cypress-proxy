describe("server", () => {
    it("should load the server", () => {
        cy.visit("/")
        cy.contains("Hello World")
    })
})