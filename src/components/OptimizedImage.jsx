import { useState } from 'react'

export default function OptimizedImage({ 
  src, 
  alt, 
  className, 
  style, 
  fallbackSrc = '/default-avatar.png',
  loading = 'lazy'
}) {
  const [imageSrc, setImageSrc] = useState(src)
  const [imageError, setImageError] = useState(false)

  const handleError = () => {
    if (!imageError) {
      setImageSrc(fallbackSrc)
      setImageError(true)
    }
  }

  return (
    <img
      src={imageSrc}
      alt={alt}
      className={className}
      style={style}
      loading={loading}
      onError={handleError}
      onLoad={() => setImageError(false)}
    />
  )
}
