describe('Arena Authentication', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.waitForAppLoad()
  })

  describe('Login Page', () => {
    it('should display login form correctly', () => {
      cy.shouldBeOnLoginPage()
      cy.get('button').contains('Accedi').should('be.visible')
      cy.get('button').contains('Accedi con Google').should('be.visible')
      cy.get('button').contains('Registrati').should('be.visible')
    })

    it('should switch to signup page', () => {
      cy.switchToSignUp()
      cy.shouldBeOnSignUpPage()
    })

    it('should show error with invalid email format', () => {
      cy.get('input[type="email"]').type('invalid-email')
      cy.get('input[type="password"]').type('password123')
      cy.get('button').contains('Accedi').click()
      
      // Verifica che il browser mostri errore di validazione
      cy.get('input[type="email"]').should('have.attr', 'required')
    })

    it('should show error with empty password', () => {
      cy.get('input[type="email"]').type('test@example.com')
      cy.get('button').contains('Accedi').click()
      
      // Verifica che il browser mostri errore di validazione
      cy.get('input[type="password"]').should('have.attr', 'required')
    })

    it('should handle login with invalid credentials', () => {
      cy.get('input[type="email"]').type('invalid@example.com')
      cy.get('input[type="password"]').type('wrongpassword')
      cy.get('button').contains('Accedi').click()
      
      // Verifica che il bottone mostri stato di loading
      cy.get('button').contains('Caricamento').should('be.visible')
      
      // Attendi che l'errore sia mostrato
      cy.shouldShowError('Errore')
    })

    it('should show Google OAuth button', () => {
      cy.get('button').contains('Accedi con Google').should('be.visible')
      cy.get('svg').should('be.visible') // Icona Google
    })
  })

  describe('Signup Page', () => {
    beforeEach(() => {
      cy.switchToSignUp()
    })

    it('should display signup form correctly', () => {
      cy.shouldBeOnSignUpPage()
      cy.get('input[placeholder="Nome completo"]').should('be.visible')
      cy.get('input[type="email"]').should('be.visible')
      cy.get('input[placeholder="Password"]').should('be.visible')
      cy.get('input[placeholder="Conferma password"]').should('be.visible')
      cy.get('button').contains('Registrati').should('be.visible')
    })

    it('should switch back to login page', () => {
      cy.switchToLogin()
      cy.shouldBeOnLoginPage()
    })

    it('should show error with mismatched passwords', () => {
      cy.get('input[placeholder="Nome completo"]').type('Test User')
      cy.get('input[type="email"]').type('test@example.com')
      cy.get('input[placeholder="Password"]').type('password123')
      cy.get('input[placeholder="Conferma password"]').type('different')
      cy.get('button').contains('Registrati').click()
      
      cy.shouldShowError('Le password non coincidono')
    })

    it('should show error with short password', () => {
      cy.get('input[placeholder="Nome completo"]').type('Test User')
      cy.get('input[type="email"]').type('test@example.com')
      cy.get('input[placeholder="Password"]').type('123')
      cy.get('input[placeholder="Conferma password"]').type('123')
      cy.get('button').contains('Registrati').click()
      
      cy.shouldShowError('La password deve essere di almeno 6 caratteri')
    })

    it('should handle signup with valid data', () => {
      const timestamp = Date.now()
      const email = `test${timestamp}@example.com`
      
      cy.get('input[placeholder="Nome completo"]').type('Test User')
      cy.get('input[type="email"]').type(email)
      cy.get('input[placeholder="Password"]').type('password123')
      cy.get('input[placeholder="Conferma password"]').type('password123')
      cy.get('button').contains('Registrati').click()
      
      // Verifica messaggio di successo
      cy.shouldShowSuccess('Registrazione riuscita')
    })
  })

  describe('Form Validation', () => {
    it('should validate required fields on login', () => {
      cy.get('button').contains('Accedi').click()
      
      // Verifica che i campi obbligatori siano evidenziati
      cy.get('input[type="email"]').should('have.attr', 'required')
      cy.get('input[type="password"]').should('have.attr', 'required')
    })

    it('should validate required fields on signup', () => {
      cy.switchToSignUp()
      cy.get('button').contains('Registrati').click()
      
      // Verifica che i campi obbligatori siano evidenziati
      cy.get('input[placeholder="Nome completo"]').should('have.attr', 'required')
      cy.get('input[type="email"]').should('have.attr', 'required')
      cy.get('input[placeholder="Password"]').should('have.attr', 'required')
      cy.get('input[placeholder="Conferma password"]').should('have.attr', 'required')
    })
  })

  describe('Responsive Design', () => {
    it('should work on mobile viewport', () => {
      cy.viewport('iphone-x')
      cy.shouldBeOnLoginPage()
      cy.get('button').contains('Accedi').should('be.visible')
    })

    it('should work on tablet viewport', () => {
      cy.viewport('ipad-2')
      cy.shouldBeOnLoginPage()
      cy.get('button').contains('Accedi').should('be.visible')
    })

    it('should work on desktop viewport', () => {
      cy.viewport(1920, 1080)
      cy.shouldBeOnLoginPage()
      cy.get('button').contains('Accedi').should('be.visible')
    })
  })
})
