// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: [
    '@/assets/css/main.css',
  ],
  modules: [
    '@nuxtjs/google-fonts',
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    'nuxt-icon',

  
  ],
  googleFonts: {
    families: {
      Roboto: true,
      Inter: [400, 700],
       'Josefin+Sans': true,
      Lato: [100, 300],
      Raleway: {
        wght: [100, 400],
        ital: [100]
      },
      download: true

    }
  },
  runtimeConfig:{
      appwriteApiKey:'',
      databaseKey: '',
 
      secret:{
        supabaseKey: process.env.NUXT_SUPABASE_KEY,
        supabaseUrl: process.env.NUXT_SUPABASE_URL,
      },
      public:{
        
        teste: process.env.NUXT_SUPABASE_URL,
      }
     
  },
  routeRules: {
    '/examples/*': { redirect: '/redirect-route' },
    '/modify-headers-route': { headers: { 'x-magic-of': 'nuxt and vercel' } },
    '/spa': { ssr: true },
  },
 
  
})
