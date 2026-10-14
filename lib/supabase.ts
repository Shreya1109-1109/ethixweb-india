import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zruvljzisygsspdpbkim.supabase.co';
const supabaseAnonKey = 'sb_publishable_jAX_NAblHQPuyJ4ukT8lHg_UjrlznMF';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);