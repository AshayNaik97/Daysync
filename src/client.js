import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://qzksgfvomddmcydwqmvt.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF6a3NnZnZvbWRkbWN5ZHdxbXZ0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5OTQ0MTQyNiwiZXhwIjoyMDE1MDE3NDI2fQ.Ar-UHYH8R2_q7RFBB2y24pHBN8Tj1y_vZGg5UNOyXo8"

export const supabase = createClient(supabaseUrl,supabaseKey)
