import React, { memo } from 'react'

export const Button = memo(({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  className = '', 
  ...props 
}) => {
  const baseClasses = "font-semibold rounded-2xl transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
  
  const variants = {
    primary: "bg-gradient-to-r from-gold-400 to-gold-300 text-dark-950 hover:from-gold-300 hover:to-gold-400",
    secondary: "bg-transparent text-gold-400 border-2 border-gold-400 hover:bg-gold-400 hover:text-dark-950",
    danger: "bg-transparent text-red-400 border-2 border-red-400 hover:bg-red-400 hover:text-dark-950",
    ghost: "bg-transparent text-gold-400 hover:bg-gold-400/10"
  }
  
  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  }
  
  return (
    <button 
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
})

Button.displayName = 'Button'
