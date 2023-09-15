import {createClient} from '@supabase/supabase-js';

export default defineEventHandler(async (event)=>{

  const config = useRuntimeConfig();
  const title = await readBody(event);
  const {id} = getQuery(event);
  const supabase = createClient(config.secret.supabaseUrl, config.secret.supabaseKey)
  const {data } = await supabase  .from('categories')
  .update({title })
  .eq('id', id)
return{
  data
}
  
})