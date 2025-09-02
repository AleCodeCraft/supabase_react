# Test Automatici Cypress - Signup Arena

## 🎯 Obiettivo
Questo set di test si concentra **esclusivamente** sulla funzionalità di registrazione (signup) dell'app Arena, garantendo che tutti gli aspetti del processo di registrazione funzionino correttamente.

## 📁 File di Test
- **`signup.cy.js`** - Test completi per il signup
- **`cypress.signup.config.js`** - Configurazione specifica per signup
- **`commands.js`** - Comandi personalizzati per i test

## 🚀 Come Avviare i Test

### 1. **Preparazione**
Assicurati che l'app sia in esecuzione:
```bash
pnpm dev
```

### 2. **Test Interattivi (UI)**
Apri Cypress con interfaccia grafica:
```bash
pnpm test:signup:open
```

### 3. **Test Automatici (Headless)**
Esegui i test in background senza interfaccia:
```bash
pnpm test:signup:headless
```

### 4. **Test Standard**
Esegui i test con configurazione standard:
```bash
pnpm test:signup
```

## 🔍 Cosa Testano i Test

### **Visualizzazione Form**
- ✅ Presenza di tutti i campi (nome, email, password, conferma password)
- ✅ Campi obbligatori evidenziati
- ✅ Titolo pagina corretto
- ✅ Navigazione tra login e signup

### **Validazione Campi**
- ✅ Campi obbligatori
- ✅ Formato email valido
- ✅ Lunghezza password minima (6 caratteri)
- ✅ Conferma password coincidente

### **Test Funzionali**
- ✅ Registrazione completata con successo
- ✅ Reset form dopo registrazione
- ✅ Gestione errori di validazione
- ✅ Stato loading durante processo

### **Responsive Design**
- ✅ Mobile (iPhone X)
- ✅ Tablet (iPad)
- ✅ Desktop (1920x1080)

### **Performance e UX**
- ✅ Gestione stati loading
- ✅ Gestione errori di rete
- ✅ Stabilità dell'app

## 📊 Interpretazione Risultati

### **Test Passati ✅**
```
✓ dovrebbe mostrare tutti i campi del form di registrazione
✓ dovrebbe accettare nomi validi
✓ dovrebbe completare la registrazione con dati validi
```

### **Test Falliti ❌**
```
✗ dovrebbe mostrare errori per campi vuoti
  AssertionError: expected 'input[placeholder="Nome completo"]' to have attribute 'required'
```

### **Test Instabili 🔄**
I test che falliscono per problemi di timing o rete vengono riprovati automaticamente (max 2 tentativi).

## 🛠️ Risoluzione Problemi

### **Test Fallisce per Timing**
```bash
# Aumenta timeout nella configurazione
defaultCommandTimeout: 20000
```

### **Test Fallisce per Elementi Non Visibili**
```bash
# Verifica che l'app sia caricata
cy.waitForAppLoad()
```

### **Test Fallisce per Validazione**
```bash
# Verifica che i selettori CSS siano corretti
cy.get('input[placeholder="Nome completo"]')
```

## 📱 Configurazione Viewport

I test supportano automaticamente:
- **Mobile**: `iphone-x` (375x812)
- **Tablet**: `ipad-2` (768x1024)  
- **Desktop**: `1920x1080`

## 🎥 Output dei Test

### **Video**
- Salvati in: `cypress_test/videos/`
- Mostrano l'intera esecuzione del test

### **Screenshot**
- Salvati in: `cypress_test/screenshots/`
- Generati automaticamente sui fallimenti

### **Report Console**
```bash
✓ 1 of 1 passed (15s)
  ✓ Arena Signup - Test Completi
    ✓ Visualizzazione Form Signup
      ✓ dovrebbe mostrare tutti i campi del form di registrazione
      ✓ dovrebbe mostrare il titolo corretto della pagina
```

## 🔧 Personalizzazione

### **Aggiungere Nuovi Test**
```javascript
it('dovrebbe testare nuova funzionalità', () => {
  // Test code here
})
```

### **Modificare Timeout**
```javascript
// In cypress.signup.config.js
defaultCommandTimeout: 20000
```

### **Aggiungere Nuovi Comandi**
```javascript
// In commands.js
Cypress.Commands.add('nuovoComando', () => {
  // Implementation
})
```

## 📋 Checklist Pre-Test

- [ ] App Arena in esecuzione su `localhost:5173`
- [ ] Database Supabase accessibile
- [ ] Connessione internet stabile
- [ ] Cypress installato (`pnpm install`)

## 🎯 Prossimi Passi

1. **Esegui test**: `pnpm test:signup`
2. **Analizza risultati** nella console
3. **Rivedi screenshot/video** se ci sono fallimenti
4. **Correggi problemi** identificati
5. **Riesegui test** per verificare correzioni

---

**Nota**: Questi test sono ottimizzati per performance e stabilità, con retry automatico e timeout appropriati per garantire risultati affidabili.
