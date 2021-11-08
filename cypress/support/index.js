// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';
import 'cypress-mochawesome-reporter/register';
require('cypress-xpath')

//Continue Tests if Application throws exception
//Refer : https://docs.cypress.io/api/events/catalog-of-events#Uncaught-Exceptions
Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
})

//Creating Test Suties in Cypress
//Dynamically Pass Environment Variable SUITE
//Refer : https://dzone.com/articles/cypress-test-suite-grouping-and-organizing-tests
beforeEach(function() {
    let testSuite = Cypress.env('SUITE');
    if (!testSuite) {
      return;
    }
    
    const testName = Cypress.mocha.getRunner().test.fullTitle();
    testSuite = "<"+testSuite+">"
    if (!testName.includes(testSuite)) {
      this.skip();
    }
  })

  const dayjs = require('dayjs')
  Cypress.dayjs = dayjs;