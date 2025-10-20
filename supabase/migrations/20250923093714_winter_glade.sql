/*
  # Create servers table for portfolio website

  1. New Tables
    - `servers`
      - `id` (uuid, primary key)
      - `name` (text, required) - Server name
      - `description` (text, required) - Server description
      - `pfp_url` (text, required) - Profile picture URL
      - `banner_url` (text, required) - Banner image URL
      - `invite_url` (text, required) - Server invite link
      - `created_at` (timestamp) - Creation timestamp

  2. Security
    - Enable RLS on `servers` table
    - Add policy for public read access
    - Add policy for authenticated users to manage servers
*/

CREATE TABLE IF NOT EXISTS servers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  pfp_url text NOT NULL,
  banner_url text NOT NULL,
  invite_url text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE servers ENABLE ROW LEVEL SECURITY;

-- Allow public read access to servers
CREATE POLICY "Anyone can read servers"
  ON servers
  FOR SELECT
  TO public
  USING (true);

-- Allow authenticated users to insert, update, and delete servers
CREATE POLICY "Authenticated users can manage servers"
  ON servers
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Insert some sample data
INSERT INTO servers (name, description, pfp_url, banner_url, invite_url) VALUES
  (
    'Gaming Central',
    'The ultimate gaming community for all your favorite games. Join thousands of players, participate in tournaments, and make new friends!',
    'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
    'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=800&h=300&fit=crop',
    'https://discord.gg/gaming'
  ),
  (
    'Tech Talk',
    'A community for developers, designers, and tech enthusiasts. Share knowledge, get help with coding, and stay updated with the latest tech trends.',
    'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
    'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=800&h=300&fit=crop',
    'https://discord.gg/techtalks'
  ),
  (
    'Art & Design Hub',
    'Creative minds unite! Share your artwork, get feedback, participate in design challenges, and connect with fellow artists and designers.',
    'https://images.pexels.com/photos/1047540/pexels-photo-1047540.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
    'https://images.pexels.com/photos/1047540/pexels-photo-1047540.jpeg?auto=compress&cs=tinysrgb&w=800&h=300&fit=crop',
    'https://discord.gg/artdesign'
  );
