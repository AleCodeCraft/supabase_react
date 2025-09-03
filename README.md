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

### 🎨 Design System
- ✅ **Tema dark** - Palette colori personalizzabile
- ✅ **Componenti riutilizzabili** - Button, Input, Loading
- ✅ **Responsive design** - Mobile-first approach
- ✅ **Tailwind CSS** - Utility-first CSS framework

### 🛠️ Stack Tecnologico
- **Frontend**: React 19 + Vite + Tailwind CSS
- **Backend**: Supabase (PostgreSQL + Auth + Storage)
- **Sicurezza**: Row Level Security + JWT
- **Testing**: Cypress E2E + ESLint

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
├── cypress_test/             # Test E2E Cypress
│   ├── e2e/                  # Test end-to-end
│   ├── support/              # File di supporto
│   └── fixtures/             # Dati di test
├── script_SQL/              # Schema database
├── public/                   # Asset statici
└── docs/                     # Documentazione
```

## 🎨 Design System

### **Paletta Colori**
- `dark-950` - Nero profondo (#0a0a0a)
- `dark-900` - Nero (#1a1a1a)
- `green-600` - Verde primario (#16a34a)
- `green-500` - Verde secondario (#22c55e)
- `green-400` - Verde hover (#4ade80)
- `surface-secondary` - Superfici (#2a2a2a)
- `text-primary` - Testo bianco (#ffffff)

### **Responsive**
- **Mobile-first** design
- **Breakpoints**: `sm:`, `md:`, `lg:`, `xl:`
- **Touch-friendly** per mobile

## ⚙️ Configurazione

### **Variabili Ambiente**
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-anon-key
VITE_GOOGLE_CLIENT_ID=your-google-client-id
```

### **Database Schema**
```sql
-- Tabella utenti (vedi script_SQL/01-users.sql)
CREATE TABLE users (
  id UUID REFERENCES auth.users PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  username TEXT UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## 🧪 Testing

### **Test E2E con Cypress**
```bash
# Avvia Cypress UI
pnpm cypress:open

# Esegui test in headless
pnpm cypress:run

# Test specifici
npx cypress run --spec "cypress_test/e2e/auth.cy.js"
```

### **Test Disponibili**
- ✅ **Authentication** - Login, registrazione, validazione
- ✅ **Responsive Design** - Mobile, tablet, desktop
- ✅ **Error Handling** - Gestione errori e stati
- ✅ **Form Validation** - Validazione input e messaggi

> 📖 Vedi [cypress_test/README.md](cypress_test/README.md) per dettagli completi

## 🚀 Deploy

### **Build Produzione**
```bash
pnpm build
```

### **Piattaforme Supportate**
- ✅ **Vercel** - Deploy automatico (configurazione inclusa)
- ✅ **Netlify** - Drag & drop
- ✅ **Firebase** - CLI deployment
- ✅ **GitHub Pages** - Actions workflow

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

## 📄 Licenza

MIT License - vedi [LICENSE](LICENSE) per dettagli

## 🔗 Link Utili

- [Supabase Docs](https://supabase.com/docs)
- [React Docs](https://react.dev)
- [Vite Docs](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com)

---

<div align="center">

**Template base per i tuoi progetti React**

[![GitHub stars](https://img.shields.io/github/stars/yourusername/react-app-base?style=social)](https://github.com/yourusername/react-app-base)
[![GitHub forks](https://img.shields.io/github/forks/yourusername/react-app-base?style=social)](https://github.com/yourusername/react-app-base)

</div>
