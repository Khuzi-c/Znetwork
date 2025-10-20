/*
  # Add new fields to servers table

  1. New Columns
    - `owner_role` (text) - Role/position of the server owner
    - `is_highlighted` (boolean) - Whether the server is highlighted/promoted
    - `discord_widget` (text) - Discord widget iframe embed code

  2. Updates
    - Add new columns with default values
    - Make columns optional to avoid breaking existing functionality
*/

-- Add new columns to servers table (making them nullable first)
ALTER TABLE servers 
ADD COLUMN IF NOT EXISTS owner_role text,
ADD COLUMN IF NOT EXISTS is_highlighted boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS discord_widget text;

-- Set default values for existing records
UPDATE servers 
SET 
  owner_role = COALESCE(owner_role, ''),
  is_highlighted = COALESCE(is_highlighted, false),
  discord_widget = COALESCE(discord_widget, '');
