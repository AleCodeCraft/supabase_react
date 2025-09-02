// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// Comando per attendere che l'app sia caricata
Cypress.Commands.add('waitForAppLoad', () => {
  cy.get('body').should('be.visible')
  cy.get('h1').should('contain', 'Benvenuto')
})

// Comando per verificare che siamo nella pagina di login
Cypress.Commands.add('shouldBeOnLoginPage', () => {
  cy.url().should('include', '/')
  cy.get('h1').should('contain', 'Benvenuto')
  cy.get('input[type="email"]').should('be.visible')
  cy.get('input[type="password"]').should('be.visible')
})

// Comando per verificare che siamo nella pagina di registrazione
Cypress.Commands.add('shouldBeOnSignUpPage', () => {
  cy.get('h1').should('contain', 'Registrazione')
  cy.get('input[placeholder="Nome completo"]').should('be.visible')
  cy.get('input[type="email"]').should('be.visible')
  cy.get('input[placeholder="Password"]').should('be.visible')
  cy.get('input[placeholder="Conferma password"]').should('be.visible')
})

// Comando per verificare che siamo nel profilo utente
Cypress.Commands.add('shouldBeOnProfilePage', () => {
  cy.get('h1').should('contain', 'Profilo Utente')
  cy.get('input[id="email"]').should('be.visible')
})

// Comando per passare alla pagina di registrazione
Cypress.Commands.add('switchToSignUp', () => {
  cy.get('button').contains('Registrati').click()
  cy.wait(500) // Attendi transizione
})

// Comando per tornare alla pagina di login
Cypress.Commands.add('switchToLogin', () => {
  cy.get('button').contains('Accedi').click()
  cy.wait(500) // Attendi transizione
})

// Comando per verificare messaggi di errore
Cypress.Commands.add('shouldShowError', (message) => {
  cy.get('.bg-red-500\\/10').should('contain', message)
})

// Comando per verificare messaggi di successo
Cypress.Commands.add('shouldShowSuccess', (message) => {
  cy.get('.bg-green-500\\/10').should('contain', message)
})

// Comando per attendere che un elemento sia visibile
Cypress.Commands.add('waitForElement', (selector, timeout = 10000) => {
  cy.get(selector, { timeout }).should('be.visible')
})

// Comando per attendere che un elemento contenga testo
Cypress.Commands.add('waitForText', (selector, text, timeout = 10000) => {
  cy.get(selector, { timeout }).should('contain', text)
})

// Comando per compilare il form di signup completo
Cypress.Commands.add('fillSignupForm', (userData = {}) => {
  const defaultData = {
    fullName: 'Test User',
    email: `test${Date.now()}@example.com`,
    password: 'password123',
    confirmPassword: 'password123'
  }
  
  const data = { ...defaultData, ...userData }
  
  cy.get('input[placeholder="Nome completo"]').type(data.fullName)
  cy.get('input[type="email"]').type(data.email)
  cy.get('input[placeholder="Password"]').type(data.password)
  cy.get('input[placeholder="Conferma password"]').type(data.confirmPassword)
  
  return data
})

// Comando per verificare che il form sia stato resettato
Cypress.Commands.add('shouldHaveEmptyForm', () => {
  cy.get('input[placeholder="Nome completo"]').should('have.value', '')
  cy.get('input[type="email"]').should('have.value', '')
  cy.get('input[placeholder="Password"]').should('have.value', '')
  cy.get('input[placeholder="Conferma password"]').should('have.value', '')
})

// Comando per verificare validazione campo specifico
Cypress.Commands.add('shouldValidateField', (fieldSelector, validationType) => {
  switch (validationType) {
    case 'required':
      cy.get(fieldSelector).should('have.attr', 'required')
      break
    case 'email':
      cy.get(fieldSelector).should('have.attr', 'type', 'email')
      break
    case 'password':
      cy.get(fieldSelector).should('have.attr', 'type', 'password')
      break
    default:
      cy.get(fieldSelector).should('be.visible')
  }
})

// Comando per testare responsive design
Cypress.Commands.add('testResponsiveViewport', (viewport, testFunction) => {
  cy.viewport(viewport)
  testFunction()
})
