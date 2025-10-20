/*
  # Fix RLS policies for servers table

  1. Security Updates
    - Drop existing restrictive policies
    - Add new policies that allow anonymous users to perform CRUD operations
    - This is needed since the app doesn't use Supabase authentication for owners
    - In production, you may want to implement proper authentication

  2. Policy Changes
    - Allow anonymous users to read all servers (public access)
    - Allow anonymous users to insert new servers (for owner mode)
    - Allow anonymous users to update servers (for owner mode)
    - Allow anonymous users to delete servers (for owner mode)
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Anyone can read servers" ON servers;
DROP POLICY IF EXISTS "Authenticated users can manage servers" ON servers;

-- Create new policies that allow anonymous access
-- This is needed because the app uses a simple password system instead of Supabase auth

-- Allow anyone to read servers (public portfolio)
CREATE POLICY "Public read access"
  ON servers
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Allow anonymous users to insert servers (for owner functionality)
CREATE POLICY "Anonymous insert access"
  ON servers
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Allow anonymous users to update servers (for owner functionality)
CREATE POLICY "Anonymous update access"
  ON servers
  FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

-- Allow anonymous users to delete servers (for owner functionality)
CREATE POLICY "Anonymous delete access"
  ON servers
  FOR DELETE
  TO anon, authenticated
  USING (true);
