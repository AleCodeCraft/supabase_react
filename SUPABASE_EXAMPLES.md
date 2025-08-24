# SUPABASE CLIENT - ESEMPI DI UTILIZZO

Questo file contiene esempi delle chiamate più comuni a Supabase per riferimento.

## 1. AUTENTICAZIONE (AUTH)

### 🔐 REGISTRAZIONE UTENTE
```javascript
const { data, error } = await supabase.auth.signUp({
  email: email,
  password: password,
  options: {
    data: {
      full_name: 'Nome Utente',
      avatar_url: 'https://example.com/avatar.jpg'
    }
  }
})
```

### 🔑 LOGIN CON EMAIL E PASSWORD
```javascript
const { data, error } = await supabase.auth.signInWithPassword({
  email: email,
  password: password
})
```

### ✉️ LOGIN CON MAGIC LINK (OTP)
```javascript
const { data, error } = await supabase.auth.signInWithOtp({
  email: email,
  options: {
    emailRedirectTo: 'https://tuodominio.com/auth/callback'
  }
})
```

### 🚪 LOGOUT
```javascript
const { error } = await supabase.auth.signOut()
```

### 👤 OTTIENI SESSIONE CORRENTE
```javascript
const { data: { session }, error } = await supabase.auth.getSession()
```

### 👥 OTTIENI UTENTE CORRENTE
```javascript
const { data: { user }, error } = await supabase.auth.getUser()
```

### 🔄 ASCOLTA CAMBIAMENTI AUTH
```javascript
supabase.auth.onAuthStateChange((event, session) => {
  console.log('Evento auth:', event)
  console.log('Sessione:', session)
})
```

## 2. DATABASE OPERATIONS (CRUD)

### 📖 LETTURA DATI (SELECT)
```javascript
const { data, error } = await supabase
  .from('profiles')
  .select('*')
```

### 🔍 LETTURA CON FILTRI
```javascript
const { data, error } = await supabase
  .from('profiles')
  .select('username, full_name, avatar_url, website')
  .eq('id', userId)
  .single()
```

### 🔍 LETTURA CON FILTRI AVANZATI
```javascript
const { data, error } = await supabase
  .from('profiles')
  .select('*')
  .or(`username.ilike.%${searchTerm}%,full_name.ilike.%${searchTerm}%`)
  .order('username', { ascending: true })
  .limit(10)
```

### ➕ INSERIMENTO DATI (INSERT)
```javascript
const { data, error } = await supabase
  .from('profiles')
  .insert([profileData])
  .select()
```

### ✏️ AGGIORNAMENTO DATI (UPDATE)
```javascript
const { data, error } = await supabase
  .from('profiles')
  .update(updates)
  .eq('id', userId)
  .select()
```

### 🗑️ ELIMINAZIONE DATI (DELETE)
```javascript
const { error } = await supabase
  .from('profiles')
  .delete()
  .eq('id', userId)
```

### 🔄 UPSERT (INSERT o UPDATE)
```javascript
const { data, error } = await supabase
  .from('profiles')
  .upsert(profileData, {
    onConflict: 'id'
  })
  .select()
```

## 3. STORAGE (FILE UPLOAD/DOWNLOAD)

### 📤 UPLOAD FILE
```javascript
const { data, error } = await supabase.storage
  .from(bucketName)
  .upload(filePath, file, {
    cacheControl: '3600',
    upsert: false
  })
```

### 📥 DOWNLOAD FILE
```javascript
const { data, error } = await supabase.storage
  .from(bucketName)
  .download(filePath)
```

### 🔗 OTTIENI URL PUBBLICO
```javascript
const { data } = supabase.storage
  .from(bucketName)
  .getPublicUrl(filePath)

return data.publicUrl
```

### 📋 LISTA FILE IN BUCKET
```javascript
const { data, error } = await supabase.storage
  .from(bucketName)
  .list(folderPath, {
    limit: 100,
    offset: 0
  })
```

### 🗑️ ELIMINA FILE
```javascript
const { error } = await supabase.storage
  .from(bucketName)
  .remove([filePath])
```

## 4. REAL-TIME (SUBSCRIPTIONS)

### 📡 SOTTOSCRIZIONE A CAMBIAMENTI TABELLA
```javascript
supabase
  .channel('table-db-changes')
  .on(
    'postgres_changes',
    {
      event: '*',
      schema: 'public',
      table: tableName
    },
    (payload) => {
      console.log('Cambio rilevato:', payload)
      callback(payload)
    }
  )
  .subscribe()
```

### 📡 SOTTOSCRIZIONE A CAMBIAMENTI SPECIFICI
```javascript
supabase
  .channel('profile-changes')
  .on(
    'postgres_changes',
    {
      event: 'UPDATE',
      schema: 'public',
      table: 'profiles',
      filter: `id=eq.${userId}`
    },
    (payload) => {
      console.log('Profilo aggiornato:', payload)
      callback(payload)
    }
  )
  .subscribe()
```

## 5. FUNZIONI UTILITY

### 🔍 PAGINAZIONE
```javascript
const from = (page - 1) * pageSize
const to = from + pageSize - 1

const { data, error, count } = await supabase
  .from('profiles')
  .select('*', { count: 'exact' })
  .range(from, to)
  .order('created_at', { ascending: false })
```

### 🔍 RICERCA AVANZATA
```javascript
let query = supabase
  .from('profiles')
  .select('*')

if (filters.username) {
  query = query.ilike('username', `%${filters.username}%`)
}

if (filters.fullName) {
  query = query.ilike('full_name', `%${filters.fullName}%`)
}

const { data, error } = await query
```

## 6. GESTIONE ERRORI

### 🚨 HANDLER ERRORI GENERICO
```javascript
const handleSupabaseError = (error) => {
  if (error.code === 'PGRST116') {
    return 'Nessun risultato trovato'
  }
  
  if (error.code === '23505') {
    return 'Record duplicato'
  }
  
  if (error.code === '23503') {
    return 'Violazione vincolo di integrità referenziale'
  }
  
  return error.message || 'Errore sconosciuto'
}
```

## NOTE IMPORTANTI:

1. **Gestisci sempre gli errori** con try/catch
2. **Usa le policies RLS** per la sicurezza
3. **Implementa la paginazione** per grandi dataset
4. **Usa le subscriptions** per dati real-time
5. **Testa sempre le operazioni CRUD**
6. **Mantieni le chiavi private sicure**
