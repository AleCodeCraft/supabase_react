// ***********************************************************
// This example support/e2e.js is processed and
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
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')

// Comandi personalizzati per Arena
Cypress.Commands.add('login', (email, password) => {
  cy.visit('/')
  cy.get('input[type="email"]').type(email)
  cy.get('input[type="password"]').type(password)
  cy.get('button').contains('Accedi').click()
})

Cypress.Commands.add('logout', () => {
  cy.get('button').contains('Disconnetti').click()
})

Cypress.Commands.add('switchToSignUp', () => {
  cy.get('button').contains('Registrati').click()
})

Cypress.Commands.add('switchToLogin', () => {
  cy.get('button').contains('Accedi').click()
})

// Gestione errori globali
Cypress.on('uncaught:exception', (err, runnable) => {
  // Ritorna false per prevenire che Cypress fallisca il test
  // per errori non gestiti (come errori di rete)
  return false
})
