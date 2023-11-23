import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "Your_supabase_url";
const supabaseKey = "Your_Supabase_key"

export const supabase = createClient(supabaseUrl,supabaseKey)
