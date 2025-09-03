# Regole Prompt per Arena Project

## 🚀 REGOLE GENERALI
- **SEMPRE** rispondi in italiano
- Usa emoji per rendere le risposte più chiare e piacevoli
- Sii preciso e dettagliato nelle spiegazioni
- Fornisci esempi pratici quando possibile

## 📁 GESTIONE FILE DI ESCLUSIONE (CRITICO!)
### Sincronizzazione Automatica .gitignore ↔ .vercelignore
- **OGNI VOLTA** che si modifica il `.gitignore`, aggiorna **AUTOMATICAMENTE** anche il `.vercelignore`
- **OGNI VOLTA** che si modifica il `.vercelignore`, aggiorna **AUTOMATICAMENTE** anche il `.gitignore`
- Mantieni sempre **PERFETTA SINCRONIZZAZIONE** tra i due file
- Se un file viene aggiunto/rimosso da uno, deve essere aggiunto/rimosso anche dall'altro

### Verifica Pre-Commit OBBLIGATORIA
**PRIMA DI OGNI COMMIT:**
1. ✅ Verifica che `.gitignore` e `.vercelignore` siano sincronizzati
2. ✅ Controlla che non ci siano file sensibili esposti
3. ✅ Verifica che le cartelle pesanti (node_modules, dist, etc.) siano escluse
4. ✅ Controlla che i file di test e documentazione siano esclusi dal deploy
5. ✅ Assicurati che i file di configurazione locale siano protetti

## 🔒 SICUREZZA
- **MAI** committare file con password, API key o credenziali
- **MAI** committare file `.env` con dati sensibili
- **MAI** committare cartelle `node_modules/`
- **MAI** committare file di build (`dist/`, `build/`)

## 🗄️ SUPABASE CLIENT (CRITICO!)
- **MAI** modificare il client Supabase (`src/features/auth/supabaseClient.js`) se non esplicitamente richiesto
- **MAI** toccare la configurazione di connessione a Supabase senza autorizzazione
- **MAI** modificare le credenziali o l'URL di Supabase
- Il client Supabase deve rimanere **INVIOLABILE** a meno di richieste specifiche
- Se necessario modificare Supabase, **CHIEDERE SEMPRE CONFERMA** prima di procedere

## 🧪 TESTING
- Mantieni sempre i test funzionanti
- I file di test devono essere nel `.gitignore` ma **NON** nel `.vercelignore`
- I test devono funzionare localmente e in CI/CD

## 📚 DOCUMENTAZIONE
- Mantieni aggiornato il README.md
- Documenta tutte le modifiche importanti
- Aggiorna la documentazione quando si aggiungono nuove funzionalità

## 🚀 DEPLOY
- Verifica sempre che il `.vercelignore` sia corretto prima del deploy
- Controlla che non ci siano file inutili che rallentano il build
- Assicurati che solo i file necessari per la produzione vengano deployati

## ⚠️ CHECKLIST PRE-COMMIT
```
□ .gitignore e .vercelignore sono sincronizzati
□ File sensibili sono protetti
□ Cartelle pesanti sono escluse
□ Test funzionano localmente
□ Documentazione è aggiornata
□ Nessun file di build viene committato
□ Nessuna credenziale è esposta
□ Client Supabase NON è stato modificato (a meno di richiesta esplicita)
```

## 🔄 COMANDI UTILI
```bash
# Verifica stato git
git status

# Verifica file ignorati
git check-ignore *

# Verifica file che verranno committati
git diff --cached

# Verifica sincronizzazione
diff .gitignore .vercelignore
```

## 📝 NOTE IMPORTANTI
- Queste regole sono **CRITICHE** per la sicurezza e performance del progetto
- **NON IGNORARE MAI** la verifica pre-commit
- **SEMPRE** sincronizzare i file di esclusione
- In caso di dubbi, **VERIFICA PRIMA** di committare