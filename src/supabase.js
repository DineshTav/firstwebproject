import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://snzqbpsbaxalosqptkzn.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNuenFicHNiYXhhbG9zcXB0a3puIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDkyMDczMjEsImV4cCI6MjAyNDc4MzMyMX0.3Lkwbid-PRbQJahWlIhbEIl8BhQ_Ak3OqDJmhnGbkqs";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
