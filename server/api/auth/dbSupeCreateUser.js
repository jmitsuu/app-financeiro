import {createClient} from '@supabase/supabase-js';

export default defineEventHandler(async (event)=>{

  const rId = Math.random() * (5614654125 - 20516) + 4256;
  const config = useRuntimeConfig();
  const body = await readBody(event)
  
  const supabase = createClient(config.secret.supabaseUrl, config.secret.supabaseKey)
  const { data, error } = await supabase  .from('users')
  .insert([
    { id:rId.toFixed(0),  email:body[0], password:body[1], name:body[2], auth:false  },
  ])
  .select();
return{
  data, error
}
  
})