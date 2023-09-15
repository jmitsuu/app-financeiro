<script setup>



const message = ref();
const name = ref();
const email = ref();
const password = ref();
const checkEmail = ref([])
const spin = ref(false);
const waitMessage = ref();



    const { data, error, refresh } = await useFetch("/api/auth/dbSupeSignin", {
      method: "get",
    });
data.value.data.filter((item)=>{
    checkEmail.value.push(item.email)
   
})
console.log(checkEmail.value)

const registerUser = async () => {


if (checkEmail.value.indexOf(email.value) !== -1) {
  console.log('Email ja cadastrado.');
  waitMessage.value = false
  message.value  = "E-mail já cadastrado"
} else{
    try {
         useFetch("/api/auth/dbSupeCreateUser", {
        method: "post",
        body:[email.value, password.value, name.value]
      });
      spin.value = true;
      waitMessage.value = true
      message.value  = "cadastro realizado"
  
    } catch (error) {
      console.log(error);
    }
}  
};
function redirect(){
   
      setTimeout(()=>{
        window.location.href="/auth/login" 
      },1300)
 
   
}

onMounted(() => {

});
</script>

<template>
  <div class="flex h-screen justify-center items-center">
    <div class="bg-gray-200 py-4 bg-opacity-80 rounded-md">
      <form class="flex flex-col px-6 gap-2" @submit.prevent="registerUser">
        <h1 class="text-center text-[2.1rem]">Registrar</h1>
        <label class="text-[1.2rem]">Nome</label>
        <input
          type="text"
          v-model="name"
          class="w-64 py-2 rounded-sm outline-none text-gray-600 font-semibold px-1"
          placeholder="Nome"
          required
        />
        <label class="text-[1.2rem]">Email</label>
        <input
          type="email"
          v-model="email"
          class="w-64 py-2 rounded-sm outline-none text-gray-600 font-semibold px-1"
          placeholder="E-mail"
          required
        />
        <label class="text-[1.2rem]">Senha</label>
        <input
          type="password"
          v-model="password"
          class="w-64 py-2 rounded-sm outline-none text-gray-600 font-semibold px-1"
          placeholder="Senha"
          required
        />
     
    
        <button
        @click="redirect"
          class="mt-3 py-1 px-2 rounded-md bg-gray-300 text-slate-600 hover:text-slate-200 transition-all font-semibold w-32 mx-auto hover:bg-gray-700"
        >
        <Icon
            v-if="spin"
            name="svg-spinners:90-ring-with-bg"
            color="black"
            class="z-50 w-6 h-6"
          
          />
          <span v-else>
            Registrar
          </span>
      
        </button>
                

      </form>
      <NuxtLink to="/auth/login">
        <p
          class="text-center text-[0.8rem] mt-4 cursor-pointer text-gray-600 font-semibold hover:text-gray-400"
        >
          voltar para login
        </p>
      </NuxtLink>

      <h1 v-if="waitMessage" class="text-center text-green-600">
       {{ message }}
      </h1>
      
      <h1 v-else class="text-center text-red-600">
       {{ message }}
      </h1>
    </div>
  </div>
</template>
