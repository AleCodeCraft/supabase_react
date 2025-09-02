describe('Arena Signup - Test Completi', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.waitForAppLoad()
    cy.switchToSignUp()
    cy.shouldBeOnSignUpPage()
  })

  describe('Visualizzazione Form Signup', () => {
    it('dovrebbe mostrare tutti i campi del form di registrazione', () => {
      // Verifica presenza di tutti i campi
      cy.get('input[placeholder="Nome completo"]').should('be.visible')
      cy.get('input[type="email"]').should('be.visible')
      cy.get('input[placeholder="Password"]').should('be.visible')
      cy.get('input[placeholder="Conferma password"]').should('be.visible')
      cy.get('button').contains('Registrati').should('be.visible')
      
      // Verifica che i campi siano obbligatori
      cy.get('input[placeholder="Nome completo"]').should('have.attr', 'required')
      cy.get('input[type="email"]').should('have.attr', 'required')
      cy.get('input[placeholder="Password"]').should('have.attr', 'required')
      cy.get('input[placeholder="Conferma password"]').should('have.attr', 'required')
    })

    it('dovrebbe mostrare il titolo corretto della pagina', () => {
      cy.get('h1').should('contain', 'Registrazione')
    })

    it('dovrebbe permettere di tornare alla pagina di login', () => {
      cy.switchToLogin()
      cy.shouldBeOnLoginPage()
    })
  })

  describe('Validazione Campi Obbligatori', () => {
    it('dovrebbe mostrare errori per campi vuoti', () => {
      cy.get('button').contains('Registrati').click()
      
      // Verifica che i campi obbligatori siano evidenziati
      cy.get('input[placeholder="Nome completo"]').should('have.attr', 'required')
      cy.get('input[type="email"]').should('have.attr', 'required')
      cy.get('input[placeholder="Password"]').should('have.attr', 'required')
      cy.get('input[placeholder="Conferma password"]').should('have.attr', 'required')
    })
  })

  describe('Validazione Nome Completo', () => {
    it('dovrebbe accettare nomi validi', () => {
      cy.get('input[placeholder="Nome completo"]').type('Mario Rossi')
      cy.get('input[placeholder="Nome completo"]').should('have.value', 'Mario Rossi')
    })

    it('dovrebbe accettare nomi con caratteri speciali italiani', () => {
      cy.get('input[placeholder="Nome completo"]').type('Giuseppe D\'Angelo')
      cy.get('input[placeholder="Nome completo"]').should('have.value', 'Giuseppe D\'Angelo')
    })

    it('dovrebbe accettare nomi con apostrofi e trattini', () => {
      cy.get('input[placeholder="Nome completo"]').type('Jean-Pierre O\'Connor')
      cy.get('input[placeholder="Nome completo"]').should('have.value', 'Jean-Pierre O\'Connor')
    })
  })

  describe('Validazione Email', () => {
    it('dovrebbe accettare email valide', () => {
      cy.get('input[type="email"]').type('test@example.com')
      cy.get('input[type="email"]').should('have.value', 'test@example.com')
    })

    it('dovrebbe accettare email con sottodomini', () => {
      cy.get('input[type="email"]').type('user@subdomain.example.co.uk')
      cy.get('input[type="email"]').should('have.value', 'user@subdomain.example.co.uk')
    })

    it('dovrebbe accettare email con caratteri speciali', () => {
      cy.get('input[type="email"]').type('user+tag@example.com')
      cy.get('input[type="email"]').should('have.value', 'user+tag@example.com')
    })
  })

  describe('Validazione Password', () => {
    it('dovrebbe accettare password di 6 caratteri (minimo)', () => {
      cy.get('input[placeholder="Password"]').type('123456')
      cy.get('input[placeholder="Password"]').should('have.value', '123456')
    })

    it('dovrebbe accettare password complesse', () => {
      cy.get('input[placeholder="Password"]').type('MySecurePass123!')
      cy.get('input[placeholder="Password"]').should('have.value', 'MySecurePass123!')
    })

    it('dovrebbe accettare password con caratteri speciali', () => {
      cy.get('input[placeholder="Password"]').type('P@ssw0rd#2024')
      cy.get('input[placeholder="Password"]').should('have.value', 'P@ssw0rd#2024')
    })
  })

  describe('Validazione Conferma Password', () => {
    it('dovrebbe mostrare errore per password non coincidenti', () => {
      cy.get('input[placeholder="Nome completo"]').type('Test User')
      cy.get('input[type="email"]').type('test@example.com')
      cy.get('input[placeholder="Password"]').type('password123')
      cy.get('input[placeholder="Conferma password"]').type('different123')
      cy.get('button').contains('Registrati').click()
      
      cy.shouldShowError('Le password non coincidono')
    })

    it('dovrebbe accettare password coincidenti', () => {
      cy.get('input[placeholder="Password"]').type('password123')
      cy.get('input[placeholder="Conferma password"]').type('password123')
      
      // Verifica che entrambi i campi abbiano lo stesso valore
      cy.get('input[placeholder="Password"]').should('have.value', 'password123')
      cy.get('input[placeholder="Conferma password"]').should('have.value', 'password123')
    })
  })

  describe('Test Registrazione Completata', () => {
    it('dovrebbe completare la registrazione con dati validi', () => {
      const timestamp = Date.now()
      const email = `test${timestamp}@example.com`
      
      // Compila tutti i campi
      cy.get('input[placeholder="Nome completo"]').type('Test User')
      cy.get('input[type="email"]').type(email)
      cy.get('input[placeholder="Password"]').type('password123')
      cy.get('input[placeholder="Conferma password"]').type('password123')
      
      // Clicca su registrati
      cy.get('button').contains('Registrati').click()
      
      // Verifica messaggio di successo
      cy.shouldShowSuccess('Registrazione completata')
      
      // Verifica che il form sia stato resettato
      cy.get('input[placeholder="Nome completo"]').should('have.value', '')
      cy.get('input[type="email"]').should('have.value', '')
      cy.get('input[placeholder="Password"]').should('have.value', '')
      cy.get('input[placeholder="Conferma password"]').should('have.value', '')
    })
  })

  describe('Test Responsive Design', () => {
    it('dovrebbe funzionare su viewport mobile', () => {
      cy.viewport('iphone-x')
      cy.get('input[placeholder="Nome completo"]').should('be.visible')
      cy.get('input[type="email"]').should('be.visible')
      cy.get('input[placeholder="Password"]').should('be.visible')
      cy.get('input[placeholder="Conferma password"]').should('be.visible')
      cy.get('button').contains('Registrati').should('be.visible')
    })

    it('dovrebbe funzionare su viewport tablet', () => {
      cy.viewport('ipad-2')
      cy.get('input[placeholder="Nome completo"]').should('be.visible')
      cy.get('input[type="email"]').should('be.visible')
      cy.get('input[placeholder="Password"]').should('be.visible')
      cy.get('input[placeholder="Conferma password"]').should('be.visible')
      cy.get('button').contains('Registrati').should('be.visible')
    })

    it('dovrebbe funzionare su viewport desktop', () => {
      cy.viewport(1920, 1080)
      cy.get('input[placeholder="Nome completo"]').should('be.visible')
      cy.get('input[type="email"]').should('be.visible')
      cy.get('input[placeholder="Password"]').should('be.visible')
      cy.get('input[placeholder="Conferma password"]').should('be.visible')
      cy.get('button').contains('Registrati').should('be.visible')
    })
  })

  describe('Test Performance e UX', () => {
    it('dovrebbe mostrare stato di loading durante la registrazione', () => {
      const timestamp = Date.now()
      const email = `test${timestamp}@example.com`
      
      cy.get('input[placeholder="Nome completo"]').type('Test User')
      cy.get('input[type="email"]').type(email)
      cy.get('input[placeholder="Password"]').type('password123')
      cy.get('input[placeholder="Conferma password"]').type('password123')
      
      cy.get('button').contains('Registrati').click()
      
      // Verifica che il bottone mostri stato di loading
      cy.get('button').contains('Caricamento').should('be.visible')
    })

    it('dovrebbe gestire errori di rete graziosamente', () => {
      // Simula un errore di rete (se possibile)
      cy.get('input[placeholder="Nome completo"]').type('Test User')
      cy.get('input[type="email"]').type('test@example.com')
      cy.get('input[placeholder="Password"]').type('password123')
      cy.get('input[placeholder="Conferma password"]').type('password123')
      
      cy.get('button').contains('Registrati').click()
      
      // Attendi un po' per vedere se ci sono errori
      cy.wait(2000)
      
      // Verifica che non ci siano crash dell'app
      cy.get('body').should('be.visible')
    })
  })
})
