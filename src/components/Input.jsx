import React, { memo, useState, useCallback, useMemo, useRef } from 'react'
import { validateEmail, validatePassword, validateFullName } from '../utils/validationUtils'

export const Input = memo(({ 
  type = 'text', 
  placeholder, 
  value, 
  onChange, 
  required = false,
  disabled = false,
  className = '',
  validation = null,
  showValidation = false,
  error = null, // Nuovo prop per errori esterni
  ...props 
}) => {
  const [isFocused, setIsFocused] = useState(false)
  const [hasBlurred, setHasBlurred] = useState(false)
  const validationTimeoutRef = useRef(null)
  
  const baseClasses = "w-full px-6 py-4 bg-surface-primary border-2 rounded-2xl text-text-primary placeholder-text-muted focus:outline-none transition-all duration-300"
  const disabledClasses = disabled ? "bg-surface-primary/50 text-text-muted cursor-not-allowed" : ""
  
  // Validazione debounced per performance - solo dopo 500ms di inattività
  const getValidationResult = useMemo(() => {
    if (!validation || !value || !hasBlurred) return null
    
    switch (validation) {
      case 'email':
        return validateEmail(value)
      case 'password':
        return validatePassword(value)
      case 'fullName':
        return validateFullName(value)
      default:
        return null
    }
  }, [validation, value, hasBlurred])
  
  const getBorderClasses = useMemo(() => {
    if (disabled) return "border-surface-tertiary/50"
    if (error) return "border-red-500" // Priorità agli errori esterni
    if (getValidationResult && !getValidationResult.isValid && getValidationResult.error) return "border-red-500"
    if (getValidationResult && getValidationResult.suggestions && getValidationResult.suggestions.length > 0) return "border-yellow-500"
    if (isFocused) return "border-gold-600"
    return "border-surface-tertiary"
  }, [disabled, error, getValidationResult, isFocused])
  
  const handleFocus = useCallback(() => {
    setIsFocused(true)
  }, [])
  
  const handleBlur = useCallback(() => {
    setIsFocused(false)
    setHasBlurred(true)
  }, [])
  
  const handleChange = useCallback((e) => {
    onChange(e)
    
    // Clear timeout precedente per debouncing
    if (validationTimeoutRef.current) {
      clearTimeout(validationTimeoutRef.current)
    }
    
    // Validazione debounced solo se necessario
    if (validation && showValidation) {
      validationTimeoutRef.current = setTimeout(() => {
        setHasBlurred(true)
      }, 500) // 500ms di delay per performance
    }
  }, [onChange, validation, showValidation])

  // Cleanup timeout
  React.useEffect(() => {
    return () => {
      if (validationTimeoutRef.current) {
        clearTimeout(validationTimeoutRef.current)
      }
    }
  }, [])

  return (
    <div className="space-y-2">
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        required={required}
        disabled={disabled}
        className={`${baseClasses} ${getBorderClasses} ${disabledClasses} ${className}`}
        {...props}
      />
      
      {/* Mostra errori esterni con priorità */}
      {error && (
        <div className="text-red-400 text-sm px-2">
          {error}
        </div>
      )}
      
      {/* Mostra validazioni interne solo se non ci sono errori esterni */}
      {!error && showValidation && getValidationResult && (
        <>
          {!getValidationResult.isValid && getValidationResult.error && (
            <div className="text-red-400 text-sm px-2">
              {getValidationResult.error}
            </div>
          )}
          {getValidationResult.suggestions && getValidationResult.suggestions.length > 0 && (
            <div className="text-yellow-400 text-sm px-2 space-y-1">
              {getValidationResult.suggestions.map((suggestion, index) => (
                <div key={index}>
                  {suggestion}
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
})

Input.displayName = 'Input'
