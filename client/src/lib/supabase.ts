import { createClient } from '@supabase/supabase-js';

// Supabase client configuration
// Temporarily hardcoded - will fix env loading later
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://tpffsajfxoqbyzevvwnu.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRwZmZzYWpmeG9xYnl6ZXZ2d251Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY3NzU2MDcsImV4cCI6MjA4MjM1MTYwN30.pQxFtff8wFaNbRDeVwvdzrawr2X-R2rd5ONSv3EGaqs';

console.log('Supabase URL:', supabaseUrl);
console.log('Using Supabase credentials:', !!supabaseUrl && !!supabaseAnonKey);

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Type definitions matching the actual weekly_briefs table structure
export interface Article {
  idx: number;
  id: string;
  week_start_date: string;
  title: string;
  essay_content: string;
  citations: string;
  source_document_ids: string[];
  word_count: number;
  reading_time_minutes: number;
  status: string;
  reviewer_passed: boolean | null;
  reviewer_notes: string | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}
