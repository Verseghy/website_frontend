describe('Hello Nx', () => {
  beforeEach(() => cy.visit('/'))

  it('should display welcome message', () => {
    cy.get('.logintext').contains('Bejelentkezés')
  })
})
