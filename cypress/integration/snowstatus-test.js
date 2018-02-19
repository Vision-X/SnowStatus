describe('checking DOM elements', function() {
  context('Interacting with features',
  function() {
    it('tests dropdown input, functionality, and resultant DOM changes',
    function() {
      cy.visit('https://snowstatus-colorado.firebaseapp.com/')
        .title().should('include', 'SnowStatus')

      cy.get('a.btn')
        .click();

      cy.get('.modal-content')
        .should('be.visible')
        .find('h4')
        .should('have.text', 'about SnowStatus...');

      cy.get('body').click();

      cy.get('input.select-dropdown')
        .click();
      cy.get('.dropdown-content')
        .should('be.visible')
        .find('li')
        .should('have.length.gte', 16)
        .eq(2)
        .should('have.text', 'Aspen Snowmass');

      cy.get('.dropdown-content')
        .should('be.visible')
        .find('li')
        .eq(2)
        .click();

      cy.get('#main > .weather > h2', { timeout: 10000})
        .should('be.visible')
        .should('have.text', 'Aspen / Snowmass');

      cy.get('#drop-spot2 > div > ul > li')
        .find('img')
        // .eq(0)
        .should('have.attr', 'class', 'responsive-img');
    })
  })
});
