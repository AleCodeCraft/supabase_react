# 🚀 Guida Template React + Supabase

## 🎯 Panoramica
Questo template fornisce una base solida per applicazioni React moderne con autenticazione Supabase. Include tutte le funzionalità essenziali per iniziare rapidamente un nuovo progetto.

## 🛠️ Funzionalità Incluse

### **1. Autenticazione Completa**
- **Login/Registrazione** con email e password
- **Google OAuth** integrato e configurato
- **Reset password** con email di recupero
- **Protezione rotte** automatica
- **Gestione sessioni** persistente

### **2. Gestione Profili Utente**
- **Creazione automatica** profilo alla registrazione
- **Modifica profilo** con validazione
- **Upload avatar** con storage Supabase
- **Gestione ruoli** (admin/user)

### **3. Struttura Base**
- **Componenti riutilizzabili** (Button, Input, Layout)
- **Hooks personalizzati** (useAuth, usePWA)
- **Gestione errori** con ErrorBoundary
- **Validazione form** integrata
- **Network utilities** per operazioni offline

### **4. PWA Ready**
- **Service Worker** configurato
- **Manifest** per installazione
- **Offline support** base
- **Push notifications** ready

## 🎨 Design System

### **Colori**
- **Primario**: Oro scuro (#8b6914)
- **Secondario**: Nero profondo (#0a0a0a)
- **Accent**: Grigio scuro (#2a2a2a)
- **Testo**: Bianco (#ffffff)

### **Componenti**
- **Button**: Stati hover/active/focus
- **Input**: Validazione in tempo reale
- **Card**: Ombre e bordi arrotondati
- **Layout**: Responsive e mobile-first

## 📁 Struttura File

```
src/
├── components/          # Componenti riutilizzabili
│   ├── Button.jsx
│   ├── Input.jsx
│   ├── Layout.jsx
│   └── ProtectedRoute.jsx
├── hooks/              # Custom hooks
│   ├── useAuth.js
│   └── usePWAInstall.js
├── pages/              # Pagine dell'applicazione
│   ├── auth/           # Autenticazione
│   ├── Home.jsx
│   └── NotFound.jsx
├── utils/              # Utility e helper
│   ├── errorHandler.js
│   ├── validationUtils.js
│   └── networkUtils.js
└── App.jsx             # Componente principale
```

## 🔧 Configurazione

### **1. Environment Variables**
```env
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
```

### **2. Database Setup**
- Esegui lo script `script_SQL/template_database.sql`
- Configura le policies RLS
- Abilita Google OAuth in Supabase

### **3. Google OAuth (Opzionale)**
- Segui la guida in `How to Supabase+Google.md`
- Configura Google Cloud Console
- Aggiungi redirect URI

## 🚀 Personalizzazione

### **1. Aggiungere Nuove Tabelle**
```sql
-- Esempio: tabella posts
create table posts (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  content text,
  user_id uuid references profiles(id),
  created_at timestamp with time zone default now()
);
```

### **2. Creare Nuovi Componenti**
```jsx
// src/components/PostCard.jsx
import { Button } from './Button'

export function PostCard({ post }) {
  return (
    <div className="bg-surface-secondary p-4 rounded-lg">
      <h3>{post.title}</h3>
      <p>{post.content}</p>
      <Button>Leggi di più</Button>
    </div>
  )
}
```

### **3. Aggiungere Nuove Pagine**
```jsx
// src/pages/Posts.jsx
import { useAuth } from '../hooks/useAuth'
import { PostCard } from '../components/PostCard'

export function Posts() {
  const { user } = useAuth()
  
  return (
    <div>
      <h1>I Miei Post</h1>
      {/* Logica per visualizzare i post */}
    </div>
  )
}
```

## 📱 Responsive Design

### **Breakpoints**
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### **Componenti Responsive**
- **Layout**: Sidebar su desktop, bottom nav su mobile
- **Grid**: Adattivo con CSS Grid
- **Typography**: Scale responsive

## 🔒 Sicurezza

### **Row Level Security (RLS)**
- **Profili**: Solo il proprietario può modificare
- **Storage**: Controllo accessi per file
- **API**: Validazione ruoli

### **Best Practices**
- **Validazione client/server**
- **Sanitizzazione input**
- **Rate limiting**
- **HTTPS obbligatorio**

## 🧪 Testing

### **Struttura Test**
```
src/
├── __tests__/
│   ├── components/
│   ├── hooks/
│   └── utils/
└── test-utils/
    └── testHelpers.js
```

### **Comandi Test**
```bash
npm run test        # Esegui tutti i test
npm run test:watch  # Test in modalità watch
npm run test:coverage # Test con coverage
```

## 🚀 Deploy

### **Vercel (Raccomandato)**
```bash
npm run build
vercel --prod
```

### **Environment Variables**
- Configura le variabili in Vercel Dashboard
- Aggiungi URL di produzione in Google OAuth
- Aggiorna redirect URI in Supabase

## 📚 Risorse Utili

### **Documentazione**
- [React Docs](https://react.dev)
- [Supabase Docs](https://supabase.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Vite Docs](https://vitejs.dev/guide)

### **Community**
- [Supabase Discord](https://discord.supabase.com)
- [React Community](https://react.dev/community)
- [Vercel Community](https://github.com/vercel/vercel/discussions)

## 🆘 Supporto

### **Problemi Comuni**
1. **Errori di autenticazione**: Verifica configurazione Supabase
2. **Problemi OAuth**: Controlla redirect URI
3. **Errori build**: Verifica environment variables
4. **Problemi PWA**: Controlla manifest e service worker

### **Debug**
- Usa React DevTools
- Controlla console browser
- Verifica network tab
- Controlla Supabase logs

---

**🎉 Buon coding con il tuo nuovo progetto React + Supabase!**
