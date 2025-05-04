// supabase/supabase.js
import { createClient } from "@supabase/supabase-js";

// Replace with your actual Supabase URL and Key
const supabaseUrl = "https://ysuvlidlzkohensxslmq.supabase.co"; // Your Supabase URL
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlzdXZsaWRsemtvaGVuc3hzbG1xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYzMjc1MTUsImV4cCI6MjA2MTkwMzUxNX0.HwhcMsI-blZR0BRsazhaLEQcn6AxWNOTrd72kMtIs84"; // Your public API key

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
