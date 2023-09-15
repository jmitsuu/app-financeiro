<script setup>
import account from "../../../composables/useAppwrite";
const message = ref('');
const email = ref();
const password = ref();
const spin = ref(false);
const waitMessage = ref();

const login = async () => {
  // if (!email.value && !password.value) return
  try {
    const { data, error } = await useFetch("/api/auth/dbSupeSignin", {
      method: "get",
    });

    data.value.data.filter((item) => {
    
      if (item.email.indexOf(email.value) === -1 || item.password.indexOf(password.value) === -1) {
        
        waitMessage.value = false;
        message.value = 'usuario ou senha errados'
       
      } else {
        console.log("true");
      localStorage.setItem(
        "credentials",
        JSON.stringify({ id: item.id, name: item.name, email:item.email })
      );
      authorization(item.id);
      spin.value = true;
      waitMessage.value = true;
        message.value = 'Login Realizado'
      }
    });
  } catch (error) {
    console.log(error);
  }
};

async function authorization(id) {
  await useFetch(`/api/auth/dbSupUptoken?id=${id}`, {
    method: "patch",
    body: true,
  });
}

// function redirect() {
//   setTimeout(() => {
//     window.location.href = "/gastos";
//   }, 2000);
// }
</script>

<template>
  <div class="flex h-screen justify-center items-center">
    <div class="bg-gray-200 py-4 bg-opacity-80 rounded-md">
      <form class="flex flex-col px-6 gap-2" @submit.prevent="login">
        <h1 class="text-center text-[2.1rem]">Acessar Painel</h1>

        <label class="text-[1.2rem]">Email</label>
        <input
          type="email"
          v-model="email"
          required
          class="w-64 py-2 rounded-sm outline-none text-gray-600 font-semibold px-1"
          placeholder="E-mail"
        />
        <label class="text-[1.2rem]">Senha</label>
        <input
          type="password"
          required
          v-model="password"
          class="w-64 py-2 rounded-sm outline-none text-gray-600 font-semibold px-1"
          placeholder="Senha"
        />
  <NuxtLink to="/gastos">
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
          <span
          v-else
          >
            Logar
          </span>
        
        </button>
      </NuxtLink>

        <NuxtLink to="/auth/register">
          <p class="text-center cursor-pointer text-semibold text-gray-600">
            Registrar
          </p>
        </NuxtLink>
      </form>
      
      <h1 v-if="waitMessage" class="text-center text-green-600">
       {{ message }}
      </h1>
      
      <h1 v-else class="text-center text-red-600">
       {{ message }}
      </h1>
    </div>
  </div>
</template>
