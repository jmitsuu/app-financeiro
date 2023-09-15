<script setup>
const newCategory = ref();
const inputNewCategory = ref();
import { useDatabase } from "../stores/request";
const store = useDatabase();
const checkId = ref();
const editOff = ref(false);
const newInput = ref();
const categories = ref();
const logout = ref()
  const rId = Math.random() * (5614654125 - 20516) + 4256;
// definePageMeta({

//   middleware: [
//     'auth',
//   ],
// });
async function getCategor() {
  const { data } = await useFetch(`/api/categories/dbSuperbase`, {});

  categories.value =  data.value.data.filter(item=>{
 return item.email.includes('default') || item.email === store.emailSession
  })
 


  editOff.value = true;
}
getCategor();

async function pushNewCategory() {
  if (!newCategory.value) return;
  useFetch(`/api/categories/dbSupeCreate`, {
    method: "post",
    body: [newCategory.value, store.emailSession]
  });

  setTimeout(() => {
    getCategor();
  }, 300);
}

function deleteCategory(id) {
  useFetch(`/api/categories/dbSupeDelete?id=${id}`,{
    method:'delete',
  })
  setTimeout(() => {
    getCategor();
  }, 300);
}
function openEdit(id) {
  editOff.value = true;
  checkId.value = id;
}
function editCategory(id) {

  if (!inputNewCategory.value) return;
  useFetch(`/api/categories/dbSupUpdate?id=${id}`, {
    method: "patch",
    body: JSON.stringify(inputNewCategory.value )
  });
  setTimeout(() => {
    getCategor();
    openEdit();
  }, 300);
}
</script>

<template>
     <LazyMenu />
     
  <section class="w-full h-screen relative  m-2 rounded-3xl px-4  py-3 bg-gray-100">
    
    <div
            @click="!logout ? (logout = true) : (logout = false)"
            class="h-20 block  lg:hidden bg-white absolute rounded-md right-8 px-2  cursor-pointer"
          >
            <div class="relative ">
              <div
                 v-if="logout"
                class="absolute flex flex-col right-12   bg-[#663399] text-white  text-center p-2 rounded-md"
              >
              
                <NuxtLink
                  to="/"
                  class=" hover:bg-blue-200 rounded-mdtransition-all"
                  @click="modal = false"
                  >Home</NuxtLink
                >
                <NuxtLink
                  to="/gastos"
                  class=" hover:bg-blue-200 rounded-md  transition-all"
                  @click="modal = false"
                  >Gastos</NuxtLink
                >
                <NuxtLink
                  to="/categorias"
                  class=" hover:bg-blue-200 rounded-md transition-all"
                  @click="modal = false"
                  >Categorias</NuxtLink
                >
                <NuxtLink to="/auth/login">

           
                <p 
             
                @click="store.closeSession"
                class="text-red-500 bold">Sair</p>
              </NuxtLink>
              </div>

              <img
                src="https://picsum.photos/200"
                class="rounded-full h-10 w-10 mx-auto my-2 hover:opacity-50 transition duration-500"
              />
              <p class="text-center">{{ store.userName }}</p>
            </div>
          </div>
    
    <div class=" h-screen w-full justify-center items-center flex flex-col ">

      
      <h1 class="text-[2.1rem] font-semibold mb-10">Adicionar Categoria</h1>
      <div class="flex flex-col sm:flex-row xl:flex-row md:flex-row lg:flex-row justify-center">
        <input type="text" v-model="newCategory" class="xl:w-64  p-3 rounded-md" />
        <button
          @click="pushNewCategory"
          class=" mt-2 xl:ml-2 py-3 px-2 rounded-md bg-blue-700 hover:bg-blue-800 text-white"
        >
          Adicionar
        </button>
      </div>
      <div class="bg-slate-200 xl:w-[800px] mt-3  overflow-y-visible h-2/2 m-h-2/3 bg-opacity-50 rounded-md">
        <h1 class="text-[1.2rem] border-b-2 p-2 font-semibold text-gray-600 mt-8">
          Categorias
        </h1>
     
        <div  class="text-sm xl:text-lg p-2">
          <div
            class="flex mb-4 w-full font-semibold justify-between"
            v-for="item in categories"
            :key="item.id"
          >
            <div>
              <input
                type="text"
                v-if="
                  item.id == checkId ? (newInput = true) : (newInput = false)
                "
                v-model="inputNewCategory"
                :placeholder="item.title"
                class="text-gray-800 rounded-sm p-1"
              />
              <input
                type="text"
                v-else
                v-model="item.title"
                class="text-gray-800 bg-transparent p-1 rounded-sm"
                :disabled="!editOff"
              />
              <Icon
                name="ep:arrow-down-bold"
                class="text-green-500 hover:text-green-600 cursor-pointer ml-4"
                v-if="item.id == checkId ? (editOff = true) : (editOff = false)"
                @click="editCategory(item.id)"
              />
              <Icon
                name="ep:close"
                class="text-red-500 hover:text-red-600 cursor-pointer ml-2"
                v-if="item.id == checkId ? (editOff = true) : (editOff = false)"
                @click="openEdit()"
              />
            </div>

            <div class="flex gap-2">
              <p
                class="text-blue-500 cursor-pointer hover:text-blue-600"
                @click="openEdit(item.id)"
              >
                Edit
              </p>
              <p
                class="text-red-500 cursor-pointer hover:text-red-600"
                @click="deleteCategory(item.id)"
              >
                Excluir
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
