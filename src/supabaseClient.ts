import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://cifznoilfpusmwxtmjqc.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNpZnpub2lsZnB1c213eHRtanFjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjcwNDYyMzEsImV4cCI6MjA0MjYyMjIzMX0.Uk6diBKfkk4nFRSAp2bEOSKy-UrUGEzlGFLwU5NjWQo';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);