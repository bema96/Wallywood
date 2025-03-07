

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Indlæs variabler fra .env-fil
dotenv.config();

// Hent Supabase URL og Key fra variablerne .env-fil
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

// Opret og eksporter Supabase-klienten
export const supabase = createClient(supabaseUrl, supabaseKey);