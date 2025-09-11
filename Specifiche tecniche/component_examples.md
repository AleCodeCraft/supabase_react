# 🧩 Esempi Componenti con Palette Nero e Celeste

## 🎯 Panoramica
Questi esempi mostrano come implementare la palette di colori nero e celeste nei componenti React del template React + Supabase.

## 🔘 Componenti Bottoni

### **Bottone Primario**
```jsx
// Bottone per azioni principali (Partecipa, Invia, etc.)
export function PrimaryButton({ children, onClick, disabled = false }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        px-6 py-3 rounded-lg font-semibold text-white
        bg-accent-primary hover:bg-accent-hover
        disabled:opacity-50 disabled:cursor-not-allowed
        transition-colors duration-200
        focus:ring-2 focus:ring-accent-primary focus:ring-opacity-50
      `}
    >
      {children}
    </button>
  )
}
```

### **Bottone Secondario**
```jsx
// Bottone per azioni secondarie (Annulla, Indietro, etc.)
export function SecondaryButton({ children, onClick, disabled = false }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        px-6 py-3 rounded-lg font-semibold
        bg-surface-secondary text-accent-primary
        hover:bg-accent-bg hover:text-accent-primary
        disabled:opacity-50 disabled:cursor-not-allowed
        transition-colors duration-200
        focus:ring-2 focus:ring-accent-primary focus:ring-opacity-50
      `}
    >
      {children}
    </button>
  )
}
```

### **Bottone Outline**
```jsx
// Bottone con bordo per azioni alternative
export function OutlineButton({ children, onClick, disabled = false }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        px-6 py-3 rounded-lg font-semibold
        border-2 border-accent-primary text-accent-primary
        hover:bg-accent-primary hover:text-white
        disabled:opacity-50 disabled:cursor-not-allowed
        transition-colors duration-200
        focus:ring-2 focus:ring-accent-primary focus:ring-opacity-50
      `}
    >
      {children}
    </button>
  )
}
```

## 📋 Componenti Card

### **Card Profilo**
```jsx
// Card per visualizzare i profili utente
export function ProfileCard({ user, onEdit }) {
  return (
    <div className="bg-surface-primary border border-surface-secondary rounded-lg p-6 hover:border-accent-primary/50 transition-colors duration-200">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-accent-primary">
          {user.full_name}
        </h3>
        <span className={`
          px-3 py-1 rounded-full text-sm font-semibold
          ${user.role === 'admin' ? 'bg-red-500 text-white' : ''}
          ${user.role === 'user' ? 'bg-accent-primary text-white' : ''}
        `}>
          {user.role.toUpperCase()}
        </span>
      </div>
      
      <p className="text-text-secondary mb-4">
        {user.email}
      </p>
      
      <div className="flex justify-between items-center">
        <span className="text-accent-secondary font-semibold">
          @{user.username}
        </span>
        <PrimaryButton onClick={() => onEdit(user.id)}>
          Modifica
        </PrimaryButton>
      </div>
    </div>
  )
}
```

### **Card Dashboard**
```jsx
// Card per visualizzare statistiche dashboard
export function DashboardCard({ title, value, icon, trend, isCurrentUser = false }) {
  return (
    <div className={`
      bg-surface-primary border rounded-lg p-4
      ${isCurrentUser ? 'border-accent-primary bg-accent-bg/10' : 'border-surface-secondary'}
      transition-colors duration-200
    `}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-full bg-accent-primary/20 flex items-center justify-center">
            <span className="text-2xl">{icon}</span>
          </div>
          <div>
            <h4 className="font-semibold text-text-primary">
              {title}
            </h4>
            <p className="text-sm text-text-secondary">
              {trend}
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-accent-primary font-bold text-2xl">
            {value}
          </p>
        </div>
      </div>
    </div>
  )
}
```

## 📊 Componenti Input

### **Input Field**
```jsx
// Input field con stile celeste
export function Input({ label, type = 'text', value, onChange, error, placeholder }) {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-text-primary">
          {label}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`
          w-full px-4 py-3 rounded-lg border
          bg-surface-primary text-text-primary
          border-surface-tertiary
          focus:border-accent-primary focus:ring-2 focus:ring-accent-primary/20
          placeholder:text-text-muted
          transition-colors duration-200
          ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}
        `}
      />
      {error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}
    </div>
  )
}
```

### **Select Dropdown**
```jsx
// Select dropdown con stile celeste
export function Select({ label, value, onChange, options, error }) {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-text-primary">
          {label}
        </label>
      )}
      <select
        value={value}
        onChange={onChange}
        className={`
          w-full px-4 py-3 rounded-lg border
          bg-surface-primary text-text-primary
          border-surface-tertiary
          focus:border-accent-primary focus:ring-2 focus:ring-accent-primary/20
          transition-colors duration-200
          ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}
        `}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}
    </div>
  )
}
```

## 🏷️ Componenti Badge e Tag

### **Badge Ruolo**
```jsx
// Badge per ruoli utente
export function RoleBadge({ role, size = 'md' }) {
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base'
  }
  
  const roleClasses = {
    admin: 'bg-red-500 text-white',
    user: 'bg-accent-primary text-white',
    moderator: 'bg-green-500 text-white'
  }
  
  return (
    <span className={`
      rounded-full font-semibold
      ${sizeClasses[size]}
      ${roleClasses[role]}
    `}>
      {role.toUpperCase()}
    </span>
  )
}
```

### **Badge Stato**
```jsx
// Badge per stati dell'applicazione
export function StatusBadge({ status }) {
  const statusClasses = {
    online: 'bg-green-500 text-white',
    offline: 'bg-gray-500 text-white',
    loading: 'bg-accent-primary text-white',
    error: 'bg-red-500 text-white',
    success: 'bg-green-500 text-white',
    warning: 'bg-yellow-500 text-white'
  }
  
  const statusLabels = {
    online: 'Online',
    offline: 'Offline',
    loading: 'Caricamento',
    error: 'Errore',
    success: 'Successo',
    warning: 'Attenzione'
  }
  
  return (
    <span className={`
      px-3 py-1 rounded-full text-sm font-semibold
      ${statusClasses[status]}
    `}>
      {statusLabels[status]}
    </span>
  )
}
```

## 🎨 Componenti Layout

### **Header**
```jsx
// Header con navigazione
export function Header({ user, onLogout }) {
  return (
    <header className="bg-dark-900 border-b border-surface-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-accent-primary">
              React + Supabase
            </h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="text-text-secondary">
              Ciao, {user.username}
            </span>
            <button
              onClick={onLogout}
              className="text-text-secondary hover:text-accent-primary transition-colors duration-200"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
```

### **Sidebar**
```jsx
// Sidebar di navigazione
export function Sidebar({ activeItem, onItemClick }) {
  const items = [
    { id: 'dashboard', label: 'Dashboard', icon: '🏠' },
    { id: 'profile', label: 'Profilo', icon: '👤' },
    { id: 'settings', label: 'Impostazioni', icon: '⚙️' },
    { id: 'help', label: 'Aiuto', icon: '❓' }
  ]
  
  return (
    <aside className="w-64 bg-dark-800 h-full">
      <nav className="p-4 space-y-2">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => onItemClick(item.id)}
            className={`
              w-full flex items-center space-x-3 px-4 py-3 rounded-lg
              transition-colors duration-200
              ${activeItem === item.id 
                ? 'bg-accent-primary text-white' 
                : 'text-text-secondary hover:bg-accent-bg/20 hover:text-accent-primary'
              }
            `}
          >
            <span className="text-lg">{item.icon}</span>
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  )
}
```

## 🎯 Utilizzo Responsive

### **Grid Responsive**
```jsx
// Grid per le card del dashboard
export function DashboardGrid({ items }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item) => (
        <DashboardCard
          key={item.id}
          title={item.title}
          value={item.value}
          icon={item.icon}
          trend={item.trend}
        />
      ))}
    </div>
  )
}
```

### **Mobile Navigation**
```jsx
// Navigazione mobile con bottom bar
export function MobileNavigation({ activeItem, onItemClick }) {
  const items = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'profile', label: 'Profilo', icon: '👤' },
    { id: 'settings', label: 'Impostazioni', icon: '⚙️' }
  ]
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-dark-900 border-t border-surface-secondary md:hidden">
      <div className="grid grid-cols-4">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => onItemClick(item.id)}
            className={`
              flex flex-col items-center py-3 px-2
              transition-colors duration-200
              ${activeItem === item.id 
                ? 'text-accent-primary' 
                : 'text-text-muted hover:text-accent-primary'
              }
            `}
          >
            <span className="text-xl mb-1">{item.icon}</span>
            <span className="text-xs font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
```

---

**🎨 Questi esempi mostrano come implementare la palette nero e celeste in modo coerente e accessibile in tutto il progetto.**
