import {createClient} from '@supabase/supabase-js';

export default defineEventHandler(async (event)=>{

  const config = useRuntimeConfig();
  const {id} = getQuery(event)
  const supabase = createClient(config.secret.supabaseUrl, config.secret.supabaseKey)
  const {error } = await supabase  .from('categories')
  .delete()
  .eq('id', id);
return{
  data, error
}
  
})