<script setup>
import { useDatabase } from "~/stores/request";
const store = useDatabase()
const logout = ref(false);


onMounted(()=>{
  store.getUserName()
})
</script>
<template>
  <header class=" w-72 h-screen hidden  lg:block pt-2 overflow-hidden bg-blue-950  rounded-3xl">
    <div @click="!logout ? logout =true : logout =false" class="text-white m-auto flex-col flex items-center justify-center mb-10">
        <img src="https://picsum.photos/200" class="w-10  hover:opacity-50 transition-all cursor-pointer rounded-full" />
        <p class="font-bold text-[1.1rem]">{{ store.userName }}</p>
        <NuxtLink to="/auth/login">
          <p  v-if="logout" @click="store.closeSession" class="cursor-pointer font-bold text-[1.2rem] hover:text-gray-300">sair</p>
        </NuxtLink>
       
      </div>
    <nav class="flex flex-col  text-white gap-10 text-center font-bold  ">
    
    
    <NuxtLink to="/" class="mr-2 hover:bg-blue-200  rounded-md py-2 transition-all">Home</NuxtLink>
    <NuxtLink to="/gastos" class="mr-2  hover:bg-blue-200  rounded-md py-2 transition-all">Gastos</NuxtLink>
    <NuxtLink to="/categorias" class="mr-2  hover:bg-blue-200  rounded-md py-2 transition-all">Categorias</NuxtLink>
    </nav>
  </header>

  
</template>