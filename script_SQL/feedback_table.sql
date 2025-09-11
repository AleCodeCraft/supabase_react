-- =====================================================
-- SCRIPT UNICO PER FEEDBACK - VERSIONE SEMPLIFICATA
-- =====================================================

-- 1. PULIZIA AUTOMATICA
--DROP TABLE IF EXISTS feedback CASCADE;

-- 2. CREAZIONE TABELLA FEEDBACK SEMPLIFICATA
CREATE TABLE IF NOT EXISTS feedback (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  type VARCHAR(20) NOT NULL CHECK (type IN ('suggestion', 'bug')),
  message TEXT NOT NULL,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'resolved')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. INDICI ESSENZIALI
CREATE INDEX IF NOT EXISTS idx_feedback_user_id ON feedback(user_id);
CREATE INDEX IF NOT EXISTS idx_feedback_type ON feedback(type);
CREATE INDEX IF NOT EXISTS idx_feedback_status ON feedback(status);

-- 4. PERMESSI BASE (senza RLS per semplicità)
GRANT ALL ON feedback TO authenticated;
GRANT ALL ON feedback TO anon;

-- 5. VISTA SEMPLIFICATA PER ADMIN
CREATE OR REPLACE VIEW feedback_with_user_details AS
SELECT 
  f.*,
  u.email as user_email,
  u.raw_user_meta_data->>'display_name' as user_display_name,
  u.raw_user_meta_data->>'full_name' as user_full_name,
  CASE 
    WHEN f.type = 'suggestion' THEN 'Suggerimento'
    WHEN f.type = 'bug' THEN 'Segnalazione Bug'
    ELSE f.type
  END as type_display,
  CASE 
    WHEN f.status = 'pending' THEN 'In Attesa'
    WHEN f.status = 'resolved' THEN 'Risolto'
    ELSE f.status
  END as status_display
FROM feedback f
JOIN auth.users u ON f.user_id = u.id;

-- 6. PERMESSI SULLA VISTA
GRANT SELECT ON feedback_with_user_details TO authenticated;
GRANT SELECT ON feedback_with_user_details TO anon;

-- 7. FUNZIONE STATISTICHE SEMPLIFICATA
CREATE OR REPLACE FUNCTION get_feedback_stats()
RETURNS TABLE (
  total_feedback BIGINT,
  pending_feedback BIGINT,
  resolved_feedback BIGINT,
  suggestions_count BIGINT,
  bugs_count BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    COUNT(*) as total_feedback,
    COUNT(*) FILTER (WHERE status = 'pending') as pending_feedback,
    COUNT(*) FILTER (WHERE status = 'resolved') as resolved_feedback,
    COUNT(*) FILTER (WHERE type = 'suggestion') as suggestions_count,
    COUNT(*) FILTER (WHERE type = 'bug') as bugs_count
  FROM feedback;
END;
$$ LANGUAGE plpgsql;

-- 8. PERMESSI SULLA FUNZIONE
GRANT EXECUTE ON FUNCTION get_feedback_stats() TO authenticated;
GRANT EXECUTE ON FUNCTION get_feedback_stats() TO anon;

-- 9. COMMENTI
COMMENT ON TABLE feedback IS 'Tabella per feedback utenti (suggerimenti e segnalazioni bug)';
COMMENT ON COLUMN feedback.type IS 'Tipo di feedback: suggestion o bug';
COMMENT ON COLUMN feedback.status IS 'Stato del feedback: pending, resolved';
COMMENT ON COLUMN feedback.message IS 'Messaggio del feedback';

-- 10. MESSAGGIO DI CONFERMA
SELECT 'Sistema feedback creato con successo!' as status;
