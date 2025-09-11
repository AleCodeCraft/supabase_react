# Regole Prompt per React + Supabase Template

## 🚀 REGOLE GENERALI
- **SEMPRE** rispondi in italiano
- Usa emoji per rendere le risposte più chiare e piacevoli
- Sii preciso e dettagliato nelle spiegazioni
- Fornisci esempi pratici quando possibile

## 🎨 PALETTE COLORI - TEMA SCURO E CELESTE
### Palette Principale
- **Nero Profondo**: `#0a0a0a` (dark-950)
- **Nero**: `#1a1a1a` (dark-900) 
- **Grigio Scuro**: `#2a2a2a` (dark-800)
- **Grigio Medio**: `#3a3a3a` (dark-700)

### Palette Celeste
- **Celeste Scuro**: `#0ea5e9` (sky-500) - Colore principale per accent
- **Celeste Chiaro**: `#38bdf8` (sky-400) - Colore secondario
- **Celeste Brillante**: `#7dd3fc` (sky-300) - Colore per hover/active
- **Celeste Tenue**: `#bae6fd` (sky-200) - Colore per background

### Superfici
- **Primaria**: `#1a1a1a` (surface-primary)
- **Secondaria**: `#2a2a2a` (surface-secondary)
- **Terziaria**: `#3a3a3a` (surface-tertiary)

### Testi
- **Primario**: `#ffffff` (text-primary) - Testo principale
- **Secondario**: `#e5e5e5` (text-secondary) - Testo secondario
- **Muted**: `#a3a3a3` (text-muted) - Testo attenuato

### Accent
- **Primario**: `#0ea5e9` (accent-primary) - Celeste scuro
- **Secondario**: `#38bdf8` (accent-secondary) - Celeste chiaro
- **Hover**: `#7dd3fc` (accent-hover) - Celeste brillante
- **Background**: `#bae6fd` (accent-bg) - Celeste tenue

### Regole di Utilizzo
- **SEMPRE** usa il tema scuro come base
- **SEMPRE** usa i colori celeste per elementi interattivi e accent
- **MAI** usare colori oro o verde (sostituiti con celeste)
- **SEMPRE** mantieni il contrasto per accessibilità

## 📁 STRUTTURA CARTELLE DEL PROGETTO (OBBLIGATORIO!)
### Organizzazione File e Cartelle
**SEGUI SEMPRE questa struttura quando crei/modifichi file:**

```
src/
├── components/          # Componenti riutilizzabili
│   ├── Button.jsx
│   ├── Input.jsx
│   ├── Layout.jsx
│   ├── ProtectedLayout.jsx
│   ├── PublicLayout.jsx
│   ├── ProtectedRoute.jsx
│   ├── InstallBanner.jsx
│   └── HealthMonitor.jsx
├── hooks/              # Custom hooks
│   ├── useAuth.js
│   ├── usePWAInstall.js
│   └── useNetworkOperation.js
├── pages/              # Pagine dell'applicazione
│   ├── auth/           # Pagine di autenticazione
│   │   ├── Login.jsx
│   │   ├── SignUp.jsx
│   │   ├── ForgotPassword.jsx
│   │   ├── ResetPassword.jsx
│   │   └── supabaseClient.js
│   ├── Home.jsx        # Pagina principale
│   ├── NotFound.jsx    # Pagina 404
│   ├── Header.jsx      # Componente header
│   └── Footer.jsx      # Componente footer
├── utils/              # Utility e helper
│   ├── ErrorBoundary.jsx
│   ├── errorHandler.js
│   ├── networkUtils.js
│   ├── retryUtils.js
│   ├── storage.js
│   ├── validationUtils.js
│   └── OptimizedImage.jsx
├── App.jsx             # Componente principale
├── main.jsx            # Entry point
└── index.css           # Stili globali
```

### Regole per la Struttura
- **SEMPRE** crea nuovi componenti in `src/components/`
- **SEMPRE** crea nuove pagine in `src/pages/`
- **SEMPRE** crea nuovi hooks in `src/hooks/`
- **SEMPRE** crea nuove utility in `src/utils/`
- **SEMPRE** usa import relativi corretti per la struttura
- **MAI** creare file fuori da questa struttura senza motivo

### Pattern di Import Corretti
```javascript
// Da src/pages/Home.jsx
import { useAuth } from '../hooks/useAuth'
import { Button } from '../components/Button'

// Da src/pages/auth/Login.jsx
import { useAuth } from '../../hooks/useAuth'
import { Button } from '../../components/Button'

// Da src/components/Button.jsx
import { validateEmail } from '../utils/validationUtils'

// Da src/hooks/useAuth.js
import { supabase } from '../pages/auth/supabaseClient'
```

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
6. ✅ Verifica che le specifiche tecniche siano aggiornate nei file di ruolo

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

### 📋 SPECIFICHE PROGETTO (CRITICO!)
- **SEMPRE** consulta i file nella cartella `Specifiche tecniche/` per le specifiche del progetto
- **SEMPRE** usa la palette di colori nero e celeste definita in `color_palette_guide.md`
- **SEMPRE** consulta `component_examples.md` per esempi di implementazione
- **SEMPRE** verifica che le implementazioni rispettino le specifiche dettagliate nei file di ruolo

### 🎨 PALETTE COLORI (OBBLIGATORIO!)
- **SEMPRE** usa il tema scuro come base
- **SEMPRE** usa i colori celeste per elementi interattivi e accent
- **MAI** usare colori oro o verde (sostituiti con celeste)
- **SEMPRE** mantieni il contrasto per accessibilità
- **SEMPRE** consulta `color_palette_guide.md` per dettagli completi

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
□ Specifiche tecniche sono aggiornate nei file di ruolo
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