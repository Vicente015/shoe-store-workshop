describe('Guest', () => {
  it('tests Guest', () => {
    cy.viewport(1905, 484);
    cy.visit('http://localhost:5173/');
    cy.get('div.flex > div:nth-of-type(3) button').click();
    cy.get('div.flex > div:nth-of-type(2) button').click();
    cy.get('nav span:nth-of-type(1)').click();
    cy.get('button').click();
    cy.location('href').should('eq', 'http://localhost:5173/payment');
    cy.get('#full_name').click();
    cy.get('#full_name').type('T');
    cy.get('#full_name').type('Test');
    cy.get('#card-number-input').type('1234');
    cy.get('#card-expiration-input').type('12/');
    cy.get('#card-expiration-input').type('12/12');
    cy.get('#cvv-input').type('123123123');
    cy.get('#pay-now').click();
  });
});
