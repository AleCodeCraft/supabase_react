# React App Base

> **Template base moderno** con autenticazione Supabase, React 19, Vite e Tailwind CSS

[![React](https://img.shields.io/badge/React-19.1.1-blue.svg)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-7.1.3-purple.svg)](https://vitejs.dev)
[![Supabase](https://img.shields.io/badge/Supabase-2.56.0-green.svg)](https://supabase.com)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.17-38B2AC.svg)](https://tailwindcss.com)

## ✨ Caratteristiche

### 🔐 Autenticazione Completa
- ✅ **Email/Password** - Login e registrazione tradizionale
- ✅ **Google OAuth** - Accesso con un click
- ✅ **Gestione sessioni** - Automatica e persistente
- ✅ **Logout sicuro** - Terminazione completa
- ✅ **Reset password** - Recupero password via email

### ⚡ Performance Ottimizzate
- ✅ **Lazy loading** - Caricamento componenti on-demand
- ✅ **Bundle splitting** - Chunk separati per librerie
- ✅ **Memoizzazione** - useCallback e useMemo ottimizzati
- ✅ **Error boundaries** - Gestione errori robusta
- ✅ **Network monitoring** - Monitoraggio qualità connessione
- ✅ **Retry logic** - Gestione automatica errori di rete

### 🎨 Design System
- ✅ **Tema dark** - Palette colori personalizzabile
- ✅ **Componenti riutilizzabili** - Button, Input, Loading
- ✅ **Responsive design** - Mobile-first approach
- ✅ **Tailwind CSS** - Utility-first CSS framework

### 🛠️ Stack Tecnologico
- **Frontend**: React 19 + Vite + Tailwind CSS
- **Backend**: Supabase (PostgreSQL + Auth + Storage)
- **Sicurezza**: Row Level Security + JWT
- **Testing**: ESLint + Error Boundaries
- **Deploy**: Vercel (configurazione inclusa)
- **Gestione File**: Git con .gitattributes per line endings

## 🚀 Quick Start

### 1. **Clona il template**
```bash
git clone https://github.com/yourusername/react-app-base.git
cd react-app-base
```

### 2. **Installa dipendenze**
```bash
pnpm install
# oppure
npm install
# oppure
yarn install
```

### 3. **Configura Supabase**
```bash
# Crea file .env nella root del progetto
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-anon-key
VITE_GOOGLE_CLIENT_ID=your-google-client-id  # Opzionale per OAuth
```

### 4. **Avvia sviluppo**
```bash
pnpm dev
# oppure
npm run dev
# oppure
yarn dev
```

> 🌐 App disponibile su `https://supabase-react-pi.vercel.app`

## 📁 Struttura Progetto

```
react-app-base/
├── src/
│   ├── features/
│   │   ├── auth/             # Autenticazione
│   │   │   ├── Login.jsx     # Login
│   │   │   ├── SignUp.jsx    # Registrazione
│   │   │   ├── ForgotPassword.jsx
│   │   │   ├── ResetPassword.jsx
│   │   │   └── supabaseClient.js
│   │   ├── dashboard/        # Dashboard
│   │   │   ├── Home.jsx      # Home page
│   │   │   └── NotFound.jsx  # 404 page
│   │   └── profile/          # Profilo utente (da implementare)
│   ├── shared/
│   │   ├── components/       # Componenti riutilizzabili
│   │   │   ├── Button.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   └── HealthMonitor.jsx
│   │   └── hooks/            # Custom hooks
│   │       ├── useAuth.js
│   │       └── useNetworkOperation.js
│   ├── utils/                # Utility
│   │   ├── ErrorBoundary.jsx
│   │   ├── OptimizedImage.jsx
│   │   ├── storage.js
│   │   ├── validationUtils.js
│   │   ├── errorHandler.js
│   │   ├── networkUtils.js
│   │   └── retryUtils.js
│   ├── App.jsx               # Componente principale
│   ├── index.css             # Stili globali
│   └── main.jsx              # Entry point
├── script_SQL/              # Schema database
│   ├── 01-users.sql         # Schema utenti base
│   └── user_managment_starter.sql  # Gestione utenti avanzata
├── public/                   # Asset statici
├── .gitattributes           # Configurazione Git line endings
├── .vercelignore            # File esclusi da Vercel
└── vercel.json              # Configurazione deploy Vercel
```

## ⚙️ Configurazione

### **Variabili Ambiente**
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-anon-key
VITE_GOOGLE_CLIENT_ID=your-google-client-id
```

## 🚀 Deploy

### **Build Produzione**
```bash
pnpm build
```

### **Deploy Automatico su Vercel**
- ✅ **Configurazione inclusa** - `vercel.json` pronto
- ✅ **Deploy automatico** - Ogni push su main
- ✅ **Preview deployments** - Branch separati
- ✅ **Environment variables** - Configurazione sicura

## 🛠️ Personalizzazione

### **Come Personalizzare il Template**

1. **Cambia il nome dell'app**:
   - Aggiorna `index.html` (title, meta description)
   - Modifica `package.json` (name, description)
   - Aggiorna `src/features/dashboard/Home.jsx`

2. **Personalizza i colori**:
   - Modifica `tailwind.config.js` per cambiare la palette
   - Aggiorna i componenti per usare i nuovi colori

3. **Aggiungi nuove funzionalità**:
   - Crea nuovi componenti in `src/features/`
   - Aggiungi nuove route in `src/App.jsx`
   - Estendi il database schema in `script_SQL/`

4. **Configura il branding**:
   - Sostituisci `/vite.svg` con il tuo logo
   - Aggiorna i meta tag per SEO
   - Personalizza i messaggi e testi

5. **Configura Supabase**:
   - ⚠️ **NON modificare** `src/features/auth/supabaseClient.js` senza autorizzazione
   - Usa le variabili ambiente per configurazione
   - Estendi lo schema database in `script_SQL/`

## 📄 Licenza

MIT License - vedi [LICENSE](LICENSE) per dettagli

## 🔗 Link Utili

### **Documentazione Principale**
- [Supabase Docs](https://supabase.com/docs)
- [React Docs](https://react.dev)
- [Vite Docs](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com)

### **Deploy e Hosting**
- [Vercel Docs](https://vercel.com/docs)
- [Vercel CLI](https://vercel.com/cli)

### **Strumenti di Sviluppo**
- [ESLint](https://eslint.org/)
- [PostCSS](https://postcss.org/)
- [Lucide Icons](https://lucide.dev/)

### **Database e Auth**
- [Supabase Auth](https://supabase.com/docs/guides/auth)
- [PostgreSQL](https://www.postgresql.org/docs/)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)

## 🆕 Novità e Miglioramenti

### **✨ Funzionalità Aggiunte**
- ✅ **Network Monitoring** - Monitoraggio qualità connessione in tempo reale
- ✅ **Retry Logic** - Gestione automatica errori di rete con backoff
- ✅ **Git Configuration** - `.gitattributes` per gestione line endings
- ✅ **Vercel Integration** - Deploy automatico configurato
- ✅ **Enhanced Error Handling** - Error boundaries e retry automatici

### **🔧 Miglioramenti Tecnici**
- ✅ **Bundle Optimization** - Chunk splitting per performance
- ✅ **Code Quality** - ESLint configurato per qualità codice
- ✅ **File Management** - Sincronizzazione `.gitignore` e `.vercelignore`
- ✅ **Security** - Protezione client Supabase e credenziali

---

<div align="center">

**Template base per i tuoi progetti React**

[![GitHub stars](https://img.shields.io/github/stars/yourusername/react-app-base?style=social)](https://github.com/yourusername/react-app-base)
[![GitHub forks](https://img.shields.io/github/forks/yourusername/react-app-base?style=social)](https://github.com/yourusername/react-app-base)

</div>
