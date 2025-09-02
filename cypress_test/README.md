# 🧪 Test Cypress - Arena

Questa cartella contiene tutti i test end-to-end (E2E) per l'applicazione Arena.

## 📁 Struttura

```
cypress_test/
├── e2e/                    # Test end-to-end
│   ├── auth.cy.js         # Test autenticazione
│   └── profile.cy.js      # Test profilo utente
├── support/               # File di supporto
│   ├── e2e.js            # Configurazione E2E
│   └── commands.js       # Comandi personalizzati
├── fixtures/             # Dati di test
│   └── test-users.json   # Credenziali test
├── videos/               # Video dei test (gitignored)
├── screenshots/          # Screenshot errori (gitignored)
└── downloads/            # File scaricati (gitignored)
```

## Comandi

### **Avvia Cypress UI:**
```bash
pnpm cypress:open
# oppure
pnpm test:e2e:open
```

### **Esegui test in headless:**
```bash
pnpm cypress:run
# oppure
pnpm test:e2e
```

### **Esegui test specifici:**
```bash
# Solo test autenticazione
npx cypress run --spec "cypress_test/e2e/auth.cy.js"

# Solo test profilo
npx cypress run --spec "cypress_test/e2e/profile.cy.js"
```

## 🧪 Test Disponibili

### **Authentication Tests (`auth.cy.js`)**
- ✅ Visualizzazione form login
- ✅ Switch tra login e registrazione
- ✅ Validazione campi obbligatori
- ✅ Gestione errori credenziali
- ✅ Test responsive design
- ✅ Google OAuth button

### **Profile Tests (`profile.cy.js`)**
- ✅ Accesso pagina profilo
- ✅ Form elementi profilo
- ✅ Upload avatar
- ✅ Aggiornamento dati
- ✅ Logout funzionalità
- ✅ Gestione errori

## Comandi Personalizzati

### **Navigazione:**
```javascript
cy.waitForAppLoad()           // Attende caricamento app
cy.shouldBeOnLoginPage()      // Verifica pagina login
cy.shouldBeOnSignUpPage()     // Verifica pagina registrazione
cy.shouldBeOnProfilePage()    // Verifica pagina profilo
```

### **Autenticazione:**
```javascript
cy.login(email, password)     // Login utente
cy.logout()                   // Logout utente
cy.switchToSignUp()           // Passa a registrazione
cy.switchToLogin()            // Passa a login
```

### **Validazione:**
```javascript
cy.shouldShowError(message)   // Verifica messaggio errore
cy.shouldShowSuccess(message) // Verifica messaggio successo
cy.waitForElement(selector)   // Attende elemento
cy.waitForText(selector, text) // Attende testo
```

## 📊 Fixtures

### **Dati di Test (`test-users.json`)**
```json
{
  "validUser": {
    "email": "test@example.com",
    "password": "password123"
  },
  "newUser": {
    "email": "newuser@example.com",
    "password": "newpassword123"
  }
}
```

## Configurazione

### **Cypress Config (`cypress.config.js`)**
- **Base URL**: `http://localhost:5173`
- **Viewport**: 1280x720
- **Video**: Abilitato
- **Screenshots**: Su errore
- **Timeout**: 10 secondi

### **Browser Support**
- ✅ Chrome
- ✅ Firefox
- ✅ Edge
- ✅ Safari (macOS)

## 🚨 Note Importanti

### **Ambiente di Test:**
- I test richiedono l'app in esecuzione su `localhost:5173`
- Avvia `pnpm dev` prima di eseguire i test
- Usa credenziali di test, non quelle reali

### **Autenticazione:**
- I test di profilo richiedono un utente autenticato
- In produzione, usa utenti di test dedicati
- Non usare credenziali reali nei test

### **File Ignorati:**
- `videos/` - Video dei test
- `screenshots/` - Screenshot errori
- `downloads/` - File scaricati
- `cypress.env.json` - Variabili ambiente

## Best Practices

### **Scrittura Test:**
- ✅ Usa descrizioni chiare
- ✅ Testa un comportamento alla volta
- ✅ Usa comandi personalizzati
- ✅ Verifica stati di loading
- ✅ Testa responsive design

### **Manutenzione:**
- ✅ Aggiorna test quando cambia UI
- ✅ Mantieni fixtures aggiornate
- ✅ Rivedi test regolarmente
- ✅ Documenta cambiamenti

## 🆘 Troubleshooting

### **Test Falliscono:**
1. Verifica che l'app sia in esecuzione
2. Controlla la console per errori
3. Verifica che i selettori siano corretti
4. Controlla i timeout

### **Problemi di Performance:**
1. Riduci il numero di test simultanei
2. Usa `cy.wait()` solo quando necessario
3. Ottimizza i selettori CSS
4. Usa `cy.intercept()` per mock API

---

**Happy Testing! 🎉**
