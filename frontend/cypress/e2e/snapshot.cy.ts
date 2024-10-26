describe('Home screenshot', () => {
  it('snapshot home', () => {
    cy.visit('http://localhost:5173/');
    cy.compareSnapshot({
      name: 'home',
    });
  });
});
