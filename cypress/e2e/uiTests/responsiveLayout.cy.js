
/// <reference types="cypress" />

describe('Responsive UI Icon Visibility Test', () => {
  const iconSelector = 'div.DrawerToggle_DrawerToggle__m405X';

  const viewports = [
    { name: 'iphone-6', width: 375, height: 667, shouldExist: true },
    { name: 'ipad-2', width: 768, height: 1024, shouldExist: false },
    { name: 'macbook-15', width: 1440, height: 900, shouldExist: false },
  ];

  viewports.forEach(({ name, width, height, shouldExist }) => {
    it(`should ${shouldExist ? 'show' : 'not show'} the icon on ${name}`, () => {
      cy.viewport(width, height);
      cy.visit('/'); 

      if (shouldExist) {
        cy.get(iconSelector).should('be.visible');
      } else {
        cy.get('body').then(($body) => {
          if ($body.find(iconSelector).length) {
            cy.get(iconSelector).should('not.be.visible');
          } else {
            expect(true).to.be.true;
          }
        });
      }
    });
  });
});
