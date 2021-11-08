import * as tamaraMethods from '../pageObjects/pageMethods/methods/tamaraMethods';

context('Tamara Exam', () => {
    describe('tamara search TCs', () => {
        before(() => {
            tamaraMethods.NavigateToUrl();
        });

        it('Make a search on Tamara site and add some validations', () => {
            cy.url().should('include','tamara.co/en/tamara-stores.html');
            tamaraMethods.verifySomeElements();
            tamaraMethods.searchWithValidData();
        });

        it('Make search with a not-right data and observe the result', () => {
            cy.url().should('include','tamara.co/en/tamara-stores.html');
            tamaraMethods.searchWithNoValidData();
        });
    });
});