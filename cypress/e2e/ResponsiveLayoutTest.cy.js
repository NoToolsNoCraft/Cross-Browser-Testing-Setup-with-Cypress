Cypress.on('uncaught:exception', (err) => {
  console.error('Error:', err.message);
  return false;
});

describe('Responsive Layout Screenshot Suite', () => {
  beforeEach(() => {
    cy.visit('https://notoolsnocraft.tech/integrating-cypress-with-browserstack/'); // Replace with your website
  });

  const viewports = [
    { name: 'iPhone SE', width: 375, height: 667 },
    { name: 'Samsung S20', width: 360, height: 800 },
    { name: 'iPhone 12 Pro', width: 390, height: 844 },
    { name: 'Pixel 5', width: 393, height: 851 },
    { name: 'Apple iPhone 16', width: 393, height: 851 },
    { name: 'Xiaomi Mi 10T Pro 5G', width: 393, height: 873 },
    { name: 'iPad Mini or Tablet', width: 768, height: 1024 },
    { name: 'iPad Pro 11', width: 834, height: 1194 },
    { name: 'Surface Pro 7', width: 912, height: 1368 },
    { name: 'Horizontal Larger Tablet', width: 1280, height: 800 },
    { name: 'Vertical Larger Tablet', width: 800, height: 1280 },
    { name: 'Smaller PC Monitor', width: 1280, height: 720 },
    { name: 'Small PC Monitor', width: 1366, height: 768 },
    { name: 'Mid Desktop', width: 1536, height: 864 },
    { name: 'Full HD', width: 1920, height: 1080 }
  ];

  viewports.forEach(viewport => {
    context(`Capturing screenshot on ${viewport.name}`, () => {
      
      it(`Takes a screenshot for ${viewport.name}`, () => {
        cy.viewport(viewport.width, viewport.height);
        cy.reload();

        // Wait for the page to be fully loaded and stable
        cy.window().should('have.property', 'document');  // Ensure the document is fully loaded
        cy.document().should('not.have.property', 'readyState', 'loading');  // Ensure the document is not still loading

        // Optionally wait for specific elements that signify full page load
        cy.get('body').should('be.visible'); // Ensure the body is visible

        // After the page is fully loaded and stable, capture and save screenshot
        //Inside of the /cypress/screenshots folder there should the separated subfolders for each browser
        const browserName = Cypress.browser.name;

        cy.screenshot(`${browserName}/${viewport.name}-screenshot`, { capture: 'fullPage' });
      });

    });
  });
});