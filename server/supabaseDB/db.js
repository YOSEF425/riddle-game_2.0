import { createClient } from '@supabase/supabase-js';

const url = 'https://blxzuesafzncgapcwkam.supabase.co'
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJseHp1ZXNhZnpuY2dhcGN3a2FtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MzAwMTAzNSwiZXhwIjoyMDY4NTc3MDM1fQ.8kJzkJTuoSmqumb2_3RcdHDXXxeNqOH_s6nmbf5_-Tk'

export const supabaseClient = createClient(url,key);

