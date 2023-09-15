import {createClient} from '@supabase/supabase-js';

export default defineEventHandler(async (event)=>{


  const config = useRuntimeConfig();
  
  const supabase = createClient(config.secret.supabaseUrl, config.secret.supabaseKey)
  const { data } = await supabase.from('listItems').select()
  return{
    data
  }
  
})