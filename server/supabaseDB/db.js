import { createClient } from '@supabase/supabase-js';

const url = 'https://blxzuesafzncgapcwkam.supabase.co'
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJseHp1ZXNhZnpuY2dhcGN3a2FtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMwMDEwMzUsImV4cCI6MjA2ODU3NzAzNX0.7yiS40utGRGjqqQfOu2AiyRssozMEqTXC1NG59_ii1M'


export const supabaseClient = createClient(url,key);

