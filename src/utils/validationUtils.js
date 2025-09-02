// Utility per validazione input avanzata e robusta

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!email) return { isValid: false, error: 'Email richiesta' }
  if (!emailRegex.test(email)) return { isValid: false, error: 'Formato email non valido' }
  if (email.length > 254) return { isValid: false, error: 'Email troppo lunga' }
  return { isValid: true, error: null }
}

export const validatePassword = (password) => {
  if (!password) return { isValid: false, error: 'Password richiesta' }
  if (password.length < 6) return { isValid: false, error: 'Password deve essere di almeno 6 caratteri' }
  if (password.length > 128) return { isValid: false, error: 'Password troppo lunga' }
  
  // Validazione progressiva - mostra suggerimenti invece di errori bloccanti
  const suggestions = []
  
  if (password.length < 8) {
    suggestions.push('Considera di usare almeno 8 caratteri')
  }
  
  if (!/[A-Z]/.test(password)) {
    suggestions.push('Aggiungi almeno una lettera maiuscola')
  }
  
  if (!/[a-z]/.test(password)) {
    suggestions.push('Aggiungi almeno una lettera minuscola')
  }
  
  if (!/\d/.test(password)) {
    suggestions.push('Aggiungi almeno un numero')
  }
  
  // Password valida se ha almeno 6 caratteri
  const isValid = password.length >= 6
  
  return { 
    isValid, 
    error: null, // Non mostrare errori per password valide
    suggestions: suggestions.length > 0 ? suggestions : null
  }
}

export const validateFullName = (fullName) => {
  if (!fullName) return { isValid: false, error: 'Nome completo richiesto' }
  if (fullName.length < 2) return { isValid: false, error: 'Nome troppo corto' }
  if (fullName.length > 100) return { isValid: false, error: 'Nome troppo lungo' }
  if (!/^[a-zA-ZÀ-ÿ\s'-]+$/.test(fullName)) {
    return { isValid: false, error: 'Nome contiene caratteri non validi' }
  }
  return { isValid: true, error: null }
}

export const validateForm = (formData, validators) => {
  const errors = {}
  let isValid = true
  
  Object.keys(validators).forEach(field => {
    const validator = validators[field]
    const value = formData[field]
    const result = validator(value)
    
    if (!result.isValid) {
      errors[field] = result.error
      isValid = false
    }
  })
  
  return { isValid, errors }
}

export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input
  
  return input
    .trim()
    .replace(/[<>]/g, '') // Rimuove tag HTML base
    .replace(/javascript:/gi, '') // Rimuove javascript: protocol
    .replace(/on\w+=/gi, '') // Rimuove event handlers
}
