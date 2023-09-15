import {createClient} from '@supabase/supabase-js';

export default defineEventHandler(async (event)=>{

  const config = useRuntimeConfig();
  const auth = await readBody(event);
  const {id} = getQuery(event);
  const supabase = createClient(config.secret.supabaseUrl, config.secret.supabaseKey)
  const {data } = await supabase  .from('users')
  .update({auth })
  .eq('id', id)
return{
  data
}
  
})