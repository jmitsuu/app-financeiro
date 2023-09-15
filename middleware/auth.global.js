

export default defineNuxtRouteMiddleware(async(to, from) => {
let isLlogedIn = false
  
// if (process.server) return
//   // skip middleware on client side entirely


const {data} =  await useFetch('/api/auth/dbSupeSignin', {

  })

  data.value.data.filter(item => {
    if(item.auth){
        isLlogedIn = item.auth
    }
  

  })
  console.log(isLlogedIn)
// if(!isLlogedIn){
//   return navigateTo(to.path="/auth/login/")

// }
if(to.path != "/auth/register")
if (!isLlogedIn && to.path !== '/auth/login/') {
  return navigateTo(to.path="/auth/login/")
}
});
