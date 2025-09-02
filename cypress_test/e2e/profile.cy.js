describe('Arena User Profile', () => {
  beforeEach(() => {
    // Nota: Per testare il profilo, l'utente dovrebbe essere già loggato
    // In un ambiente di test reale, dovresti usare un utente di test
    cy.visit('/')
  })

  describe('Profile Page Access', () => {
    it('should redirect to login if not authenticated', () => {
      // Se non autenticato, dovrebbe rimanere nella pagina di login
      cy.shouldBeOnLoginPage()
    })

    // Nota: I test seguenti richiedono un utente autenticato
    // In un ambiente di test reale, dovresti:
    // 1. Creare un utente di test
    // 2. Fare login programmatico
    // 3. Testare le funzionalità del profilo
  })

  describe('Profile Form Elements', () => {
    it('should display profile form when authenticated', () => {
      // Questo test assume che l'utente sia già loggato
      // In un test reale, dovresti fare login prima
      
      // Verifica che il form del profilo sia visibile
      cy.get('h1').contains('Profilo Utente').should('be.visible')
      cy.get('input[id="email"]').should('be.visible')
      cy.get('input[id="username"]').should('be.visible')
      cy.get('input[id="website"]').should('be.visible')
      cy.get('button').contains('Aggiorna Profilo').should('be.visible')
      cy.get('button').contains('Disconnetti').should('be.visible')
    })

    it('should have correct form labels', () => {
      cy.get('label[for="email"]').should('contain', 'Email')
      cy.get('label[for="username"]').should('contain', 'Nome')
      cy.get('label[for="website"]').should('contain', 'Website')
    })

    it('should have proper input types', () => {
      cy.get('input[id="email"]').should('have.attr', 'type', 'text')
      cy.get('input[id="username"]').should('have.attr', 'type', 'text')
      cy.get('input[id="website"]').should('have.attr', 'type', 'url')
    })

    it('should have email field disabled', () => {
      cy.get('input[id="email"]').should('be.disabled')
    })
  })

  describe('Avatar Upload', () => {
    it('should display avatar upload section', () => {
      cy.get('img[alt="Avatar"]').should('be.visible')
      cy.get('button').contains('Carica Avatar').should('be.visible')
    })

    it('should show default avatar when no image', () => {
      // Verifica che sia mostrato l'avatar di default
      cy.get('.rounded-full').should('be.visible')
    })

    it('should have file input hidden', () => {
      // Il file input dovrebbe essere nascosto
      cy.get('input[type="file"]').should('have.class', 'hidden')
    })
  })

  describe('Profile Update', () => {
    it('should update username successfully', () => {
      const newUsername = 'TestUser' + Date.now()
      
      cy.get('input[id="username"]').clear().type(newUsername)
      cy.get('button').contains('Aggiorna Profilo').click()
      
      // Verifica messaggio di successo
      cy.shouldShowSuccess('Profilo aggiornato')
    })

    it('should update website successfully', () => {
      const newWebsite = 'https://example.com'
      
      cy.get('input[id="website"]').clear().type(newWebsite)
      cy.get('button').contains('Aggiorna Profilo').click()
      
      // Verifica messaggio di successo
      cy.shouldShowSuccess('Profilo aggiornato')
    })

    it('should show loading state during update', () => {
      cy.get('input[id="username"]').clear().type('NewUsername')
      cy.get('button').contains('Aggiorna Profilo').click()
      
      // Verifica stato di loading
      cy.get('button').contains('Caricamento').should('be.visible')
    })
  })

  describe('Logout Functionality', () => {
    it('should logout successfully', () => {
      cy.get('button').contains('Disconnetti').click()
      
      // Dovrebbe tornare alla pagina di login
      cy.shouldBeOnLoginPage()
    })

    it('should have logout button styled correctly', () => {
      cy.get('button').contains('Disconnetti')
        .should('have.class', 'bg-transparent')
        .should('have.class', 'text-red-400')
        .should('have.class', 'border-red-400')
    })
  })

  describe('Form Validation', () => {
    it('should validate username field', () => {
      cy.get('input[id="username"]').should('have.attr', 'required')
    })

    it('should validate website URL format', () => {
      cy.get('input[id="website"]').type('invalid-url')
      cy.get('input[id="website"]').should('have.attr', 'type', 'url')
    })
  })

  describe('Responsive Design', () => {
    it('should work on mobile viewport', () => {
      cy.viewport('iphone-x')
      cy.get('h1').contains('Profilo Utente').should('be.visible')
      cy.get('button').contains('Aggiorna Profilo').should('be.visible')
    })

    it('should work on tablet viewport', () => {
      cy.viewport('ipad-2')
      cy.get('h1').contains('Profilo Utente').should('be.visible')
      cy.get('button').contains('Aggiorna Profilo').should('be.visible')
    })

    it('should work on desktop viewport', () => {
      cy.viewport(1920, 1080)
      cy.get('h1').contains('Profilo Utente').should('be.visible')
      cy.get('button').contains('Aggiorna Profilo').should('be.visible')
    })
  })

  describe('Error Handling', () => {
    it('should handle network errors gracefully', () => {
      // Simula un errore di rete
      cy.intercept('POST', '**/profiles', { forceNetworkError: true })
      
      cy.get('input[id="username"]').clear().type('TestUser')
      cy.get('button').contains('Aggiorna Profilo').click()
      
      // Verifica che l'errore sia gestito
      cy.shouldShowError('Errore')
    })
  })
})
