import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://qbbbpxliugcopvbptfgq.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFiYmJweGxpdWdjb3B2YnB0ZmdxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ1Mzk1NTMsImV4cCI6MjA5MDExNTU1M30.crTi1P81DDK9P0m_3ho38ybmvoU3BGb_KaI6_j5FOlo";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
