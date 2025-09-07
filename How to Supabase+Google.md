# 🚀 Setup Supabase + Google OAuth

Guida completa per configurare l'autenticazione Google OAuth con Supabase per il tuo progetto React.

## 📋 Prerequisiti

- Account Google Cloud Console
- Progetto Supabase attivo
- Applicazione React in esecuzione

---

## 🔧 Configurazione Supabase

### 1. **API Keys**
```
Settings → API Keys → Publishable Key
```
- ✅ Prendi la chiave **publishable** (non legacy)
- 📝 Salva come: `VITE_SUPABASE_PUBLISHABLE_KEY`

### 2. **Project URL**
```
Settings → General → Project URL
```
- ✅ Copia l'URL del progetto
- 📝 Salva come: `VITE_SUPABASE_URL`

### 3. **Abilita Google Provider**
```
Authentication → Providers → Google
```
- ✅ Toggle "Enable" per Google
- ⏳ Configureremo le credenziali dopo Google

---

## 🔐 Configurazione Google Cloud

### 1. **Crea Progetto**
```
🌐 https://console.cloud.google.com/
```
- ➕ Crea nuovo progetto
- 📝 Nome: `il-tuo-progetto-react`

### 2. **Configura OAuth Consent Screen**
```
APIs & Services → OAuth consent screen
```
- 🎨 **Branding:**
  - App name: `Il Tuo Progetto React`
  - User support email: `your-email@gmail.com`
  - Developer contact: `your-email@gmail.com`

- 🔐 **Scopes:**
  - `.../auth/userinfo.email`
  - `.../auth/userinfo.profile`

### 3. **Crea OAuth Client**
```
APIs & Services → Credentials → Create Credentials → OAuth 2.0 Client IDs
```
- 📱 **Application type:** Web application
- 📝 **Name:** `Il Tuo Progetto React`

- 🌐 **Authorized JavaScript Origins:**
  ```
  http://localhost:5173
  https://il-tuo-progetto.vercel.app
  ```

- 🔄 **Authorized Redirect URIs:**
  ```
  http://localhost:5173/
  https://il-tuo-progetto.vercel.app
  ```

### 4. **Scarica Credenziali**
- 💾 Scarica il file JSON
- 📁 Salva come: `google_client_secret.json`

---

## 🔗 Integrazione Supabase ↔ Google

### 1. **Configura Supabase**
```
Authentication → Providers → Google
```
- 🔑 **Client ID:** (dal file JSON)
- 🔐 **Client Secret:** (dal file JSON)
- 💾 **Save**

### 2. **Aggiorna Google Console**
```
APIs & Services → Credentials → Edit OAuth Client
```
- ➕ **Aggiungi Redirect URI:**
  ```
  https://il-tuo-progetto-id.supabase.co/auth/v1/callback
  ```

### 3. **Aggiorna File JSON**
```json
{
  "web": {
    "client_id": "your-client-id.apps.googleusercontent.com",
    "project_id": "il-tuo-progetto-react",
    "client_secret": "your-client-secret",
    "redirect_uris": [
      "http://localhost:5173/",
      "https://il-tuo-progetto.vercel.app",
      "https://il-tuo-progetto-id.supabase.co/auth/v1/callback"
    ]
  }
}
```

---

## 🧪 Test dell'Integrazione

### 1. **Avvia Applicazione**
```bash
npm run dev
```

### 2. **Test Login**
- 🌐 Vai su `http://localhost:5173`
- 🔘 Clicca "Accedi con Google"
- ✅ Verifica redirect a Google
- ✅ Verifica redirect di ritorno

---

## 🚨 Troubleshooting

### **Errori Comuni:**

| Errore | Soluzione |
|--------|-----------|
| `redirect_uri_mismatch` | Verifica URL callback in Google Console |
| `invalid_client` | Controlla Client ID/Secret in Supabase |
| `access_denied` | Verifica OAuth consent screen |

### **Debug:**
- 🔍 Browser Console (F12)
- 🌐 Network tab per vedere le richieste
- 📊 Supabase Dashboard logs

---

## 🔒 Sicurezza

### **Best Practices:**
- 🚫 **NON** committare `google_client_secret.json`
- 🔄 Ruota regolarmente le chiavi
- 🌐 Usa HTTPS in produzione
- 👀 Monitora l'utilizzo

### **Environment Variables:**
```env
VITE_SUPABASE_URL=https://il-tuo-progetto-id.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
```

---

## 📝 Note Importanti

- ✅ **URL Accessibili:** Configura tutti gli URL necessari
- 🔄 **Callback URL:** Sempre quello di Supabase per OAuth
- 🎯 **Scopes:** Solo quelli necessari per la tua app
- 🧪 **Test:** Verifica sempre in locale prima del deploy

---

**🎉 Setup completato!** La tua app ora supporta l'autenticazione Google tramite Supabase.
