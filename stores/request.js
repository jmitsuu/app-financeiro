import { defineStore } from "pinia";
import {Client, Databases} from "node-appwrite";
const count = ref(0);
const dateValue = reactive(ref([]));
const allDate = ref([])
const priceValue = ref()
const duplicados = ref([]);
const totalDay = ref([]);
const userName = ref();
const idSession =ref()
const emailSession =ref()
export const useDatabase = defineStore("useDatabase", () => {
//graph
function getGraph(items){
  items.filter(item=>{
  dateValue.value.push(
    {
      total:[item.date, item.price]
    }
  );

})

allDate.value = dateValue.value.filter(((valor, indice, self)=>{

  return self.indexOf(valor) === indice;
}) )
duplicados.value.push(allDate.value)

}
  
function getUserName(){
  const cred = localStorage.getItem('credentials')
  const storage = JSON.parse(cred)
  if(!storage){
    window.location.href="/auth/login"
  }
  userName.value =storage.name
idSession.value = storage.id
emailSession.value = storage.email
}


async function closeSession(){
 localStorage.removeItem("credentials")
  await useFetch(`/api/auth/dbSupUptoken?id=${idSession.value}`, {
                    method: "patch",
                    body: false,
                });
}

  return {
   dateValue,
   allDate,
   getGraph,
   priceValue,
   duplicados,
   getUserName,
   closeSession,
   userName,
   emailSession
  };
});
