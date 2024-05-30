describe('Navigation', function () {
  context('Navigate from page to page', () => {
    it(`Navigating to the About page`, () => {
      cy.visit('/');
      cy.get('[href="about"]').click();
      cy.get('h1').should('contain', 'The LEGO Brand Value');
    });
  });
});
