import { tamaraLocators } from '../../locators/tamaraLocators/tamara';

export function NavigateToUrl(){
   cy.visit('https://tamara.co/en/tamara-stores.html');

}


export function verifySomeElements(){
    cy.get(tamaraLocators.logoVisibilty).should('be.visible');
    cy.get(tamaraLocators.formData).should('contain', 'A lot to choose from').and('contain','Enjoy hundreds of stores that offer Tamara’s flexible payment options')
}

export function searchWithValidData() {
   let index = 0;
   index = Math.floor((Math.random() * 4));
   let searchInput = ['Namshi', 'Nice One', 'SHEIN', 'IKEA']; // inputs array

   const searchBoxInput = cy.get(tamaraLocators.searchBox);
   searchBoxInput.type(searchInput[index]); // will choose a random value of the array and then it will input it and choose it for search

   cy.get(tamaraLocators.firstResult).should('contain',searchInput[index]);
 }

 export function searchWithNoValidData() {
   let randomData = Math.floor((Math.random() * 4));

   const searchBoxInput = cy.get(tamaraLocators.searchBox);
   searchBoxInput.clear().type(`test${randomData}`); // will choose a random value 

   cy.get(tamaraLocators.noResult).should('contain',`No results for "test${randomData}", check the spelling or try with a different word`);
 }

