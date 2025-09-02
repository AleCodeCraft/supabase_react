
import { supabase } from '../features/auth/supabaseClient'

/**
 * Ottiene un URL pubblico per un file in storage
 * @param {string} bucket - Nome del bucket
 * @param {string} path - Percorso del file
 * @returns {string} URL pubblico del file
 */
export function getStorageUrl(bucket, path) {
  if (!path) return null
  
  // Se è già un URL completo, restituiscilo
  if (path.startsWith('http')) {
    return path
  }
  
  // Altrimenti, genera l'URL pubblico
  const { data } = supabase.storage.from(bucket).getPublicUrl(path)
  return data.publicUrl
}

/**
 * Ottiene l'URL dell'avatar, gestendo sia URL esterni che file locali
 * @param {string} avatarUrl - URL dell'avatar
 * @returns {string} URL dell'avatar
 */
export function getAvatarUrl(avatarUrl) {
  return getStorageUrl('avatars', avatarUrl)
}

/**
 * Genera un nome file unico per l'upload
 * @param {string} originalName - Nome originale del file
 * @returns {string} Nome file unico
 */
export function generateUniqueFileName(originalName) {
  const fileExt = originalName.split('.').pop()
  const timestamp = Date.now()
  const random = Math.random().toString(36).substring(2, 15)
  return `${timestamp}-${random}.${fileExt}`
}
