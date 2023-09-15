<script setup>
import account from "../../composables/useAppwrite";

import { ID } from "node-appwrite";

// const message = ref(false)
// const email = ref()
// const password = ref();

// const registerUser = async () => {
//     try {
//         const data = await account.createEmailSession(
          
//             email.value,
//             password.value,
      
          
//         )
//         console.log(data)
//         if(data.status == true){
     
//             message.value = true
  
//         }
//     } catch (e) {
//         console.log(e.message)
//     }
// }

// const promise = account.get();

// promise.then(function (response) {
//     console.log(response); // Success
// }, function (error) {
//     console.log(error); // Failure
// });


</script>


<template>
    <div class="flex h-screen justify-center items-center ">

        <div class="bg-gray-200  py-4 bg-opacity-80  rounded-md">
            <form class=" flex flex-col px-6 gap-2" @submit.prevent="registerUser">
                <h1 class="text-center text-[2.1rem]">Acessar Painel</h1>

                <label class="text-[1.2rem]">Email</label>
                <input type="email" v-model="email" class="w-64 py-2 rounded-sm outline-none text-gray-600 font-semibold px-1"
                    placeholder="E-mail" />
                <label class="text-[1.2rem]">Senha</label>
                <input type="password" v-model="password" class="w-64 py-2 rounded-sm outline-none text-gray-600 font-semibold px-1"
                    placeholder="Senha" />
                    <NuxtLink to="/gastos">
                        <button
                    class="mt-3 py-1 px-2 rounded-md bg-gray-300 text-slate-600  hover:text-slate-200 transition-all font-semibold w-32 mx-auto hover:bg-gray-700">
                    Logar</button>
                    </NuxtLink>
            
            </form>


    </div>


</div></template>