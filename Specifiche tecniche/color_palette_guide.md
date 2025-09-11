# 🎨 Guida Palette Colori - Nero e Celeste

## 🎯 Panoramica
Questa guida definisce la palette di colori per il template React + Supabase, basata su un tema scuro con accenti celesti.

## 🌈 Palette Completa

### **Colori Principali**
- **Nero Profondo**: `#0a0a0a` - Sfondo principale
- **Nero**: `#1a1a1a` - Superfici primarie
- **Grigio Scuro**: `#2a2a2a` - Superfici secondarie
- **Grigio Medio**: `#3a3a3a` - Superfici terziarie

### **Colori Celeste**
- **Celeste Scuro**: `#0ea5e9` - Accent principale, bottoni primari
- **Celeste Chiaro**: `#38bdf8` - Accent secondario, link
- **Celeste Brillante**: `#7dd3fc` - Hover states, focus
- **Celeste Tenue**: `#bae6fd` - Background, highlights

### **Colori Testo**
- **Bianco**: `#ffffff` - Testo principale
- **Grigio Chiaro**: `#e5e5e5` - Testo secondario
- **Grigio**: `#a3a3a3` - Testo attenuato

## 🎨 Utilizzo nei Componenti

### **Bottoni**
```css
/* Bottone Primario */
.btn-primary {
  @apply bg-accent-primary text-white hover:bg-accent-hover;
}

/* Bottone Secondario */
.btn-secondary {
  @apply bg-surface-secondary text-accent-primary hover:bg-accent-bg;
}

/* Bottone Outline */
.btn-outline {
  @apply border-2 border-accent-primary text-accent-primary hover:bg-accent-primary hover:text-white;
}
```

### **Card e Superfici**
```css
/* Card Principale */
.card-primary {
  @apply bg-surface-primary border border-surface-secondary;
}

/* Card Secondaria */
.card-secondary {
  @apply bg-surface-secondary border border-surface-tertiary;
}

/* Card Accent */
.card-accent {
  @apply bg-accent-bg/10 border border-accent-primary/20;
}
```

### **Stati delle Sfide**
```css
/* Sfida Disponibile */
.challenge-available {
  @apply bg-accent-primary text-white;
}

/* Sfida In Corso */
.challenge-active {
  @apply bg-accent-secondary text-white;
}

/* Sfida Completata */
.challenge-completed {
  @apply bg-accent-hover text-white;
}

/* Sfida Approvata */
.challenge-approved {
  @apply bg-green-500 text-white;
}

/* Sfida Rifiutata */
.challenge-rejected {
  @apply bg-red-500 text-white;
}
```

### **Classifiche e Badge**
```css
/* Livello Bronzo */
.level-bronze {
  @apply bg-amber-600 text-white;
}

/* Livello Argento */
.level-silver {
  @apply bg-gray-400 text-white;
}

/* Livello Oro */
.level-gold {
  @apply bg-yellow-500 text-white;
}

/* Posizione Classifica */
.rank-1 { @apply text-accent-hover font-bold; }
.rank-2 { @apply text-accent-secondary font-bold; }
.rank-3 { @apply text-accent-primary font-bold; }
```

## 🎯 Stati Interattivi

### **Hover Effects**
```css
.hover-celeste {
  @apply hover:bg-accent-hover hover:text-white transition-colors duration-200;
}

.hover-celeste-light {
  @apply hover:bg-accent-bg hover:text-accent-primary transition-colors duration-200;
}
```

### **Focus States**
```css
.focus-celeste {
  @apply focus:ring-2 focus:ring-accent-primary focus:ring-opacity-50;
}

.input-celeste {
  @apply border-surface-tertiary focus:border-accent-primary focus:ring-accent-primary/20;
}
```

## 📱 Responsive Design

### **Mobile First**
- Usa colori più contrastati su mobile
- Riduci l'uso di celeste tenue su schermi piccoli
- Mantieni sempre il contrasto per accessibilità

### **Desktop**
- Puoi usare più sfumature di celeste
- Aggiungi effetti hover più elaborati
- Utilizza gradienti con i colori celeste

## 🔧 Implementazione Tailwind

### **Configurazione Tailwind**
```javascript
// tailwind.config.js
colors: {
  'accent': {
    'primary': '#0ea5e9',   // sky-500
    'secondary': '#38bdf8', // sky-400
    'hover': '#7dd3fc',     // sky-300
    'bg': '#bae6fd',        // sky-200
  }
}
```

### **Classi Utili**
```html
<!-- Bottoni -->
<button class="bg-accent-primary hover:bg-accent-hover text-white">
  Partecipa
</button>

<!-- Card -->
<div class="bg-surface-primary border border-accent-primary/20">
  <h3 class="text-accent-primary">Titolo Sfida</h3>
</div>

<!-- Badge -->
<span class="bg-accent-bg text-accent-primary px-2 py-1 rounded">
  Nuovo
</span>
```

## 🎨 Esempi di Design

### **Header Navigation**
- Sfondo: `bg-dark-900`
- Logo: `text-accent-primary`
- Menu items: `text-text-secondary hover:text-accent-primary`

### **Sidebar**
- Sfondo: `bg-dark-800`
- Active item: `bg-accent-primary text-white`
- Hover item: `bg-accent-bg/20 text-accent-primary`

### **Dashboard Cards**
- Sfondo: `bg-surface-primary`
- Bordo: `border-surface-secondary`
- Titolo: `text-accent-primary`
- Testo: `text-text-secondary`

## ⚠️ Regole Importanti

1. **SEMPRE** usa il tema scuro come base
2. **SEMPRE** usa i colori celeste per elementi interattivi
3. **MAI** usare colori oro o verde (sostituiti con celeste)
4. **SEMPRE** mantieni il contrasto per accessibilità
5. **SEMPRE** testa su dispositivi diversi
6. **SEMPRE** considera utenti con problemi di vista

## 🧪 Testing Colori

### **Contrasto**
- Testa il contrasto tra testo e sfondo
- Usa strumenti come WebAIM Contrast Checker
- Mantieni almeno un rapporto 4.5:1 per testo normale

### **Accessibilità**
- Testa con simulatori di daltonismo
- Verifica che i colori non siano l'unico modo per comunicare informazioni
- Usa sempre icone o testo insieme ai colori

---

**🎨 Questa palette crea un'esperienza moderna e professionale mantenendo l'accessibilità e la leggibilità.**
