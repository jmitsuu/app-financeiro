

export default defineNuxtRouteMiddleware(async(to, from) => {
let isLlogedIn = false
  


const {data} =  await useFetch('/api/auth/dbSupeSignin', {

  })

  data.value.data.filter(item => {

    isLlogedIn = item.auth

  })
  console.log(isLlogedIn)
if(!isLlogedIn){
  return navigateTo(to.path="/auth/login/")

}
// if(!isLlogedIn){
//   return navigateTo(to.path="/auth/login/")

// }

});
