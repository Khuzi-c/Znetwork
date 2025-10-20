-- Simple fix: Add missing columns if they don't exist
ALTER TABLE servers ADD COLUMN IF NOT EXISTS owner_role text DEFAULT '';
ALTER TABLE servers ADD COLUMN IF NOT EXISTS is_highlighted boolean DEFAULT false;
ALTER TABLE servers ADD COLUMN IF NOT EXISTS discord_widget text DEFAULT '';
