import data from "./database.json"

export default eventHandler( async (id)=>{
return  $fetch(`https://barber-api-lovat.vercel.app/data/`)
})