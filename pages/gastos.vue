<script setup>
import { useDatabase } from "../stores/request";
const store = useDatabase();
const userName = ref();
const categories = ref();
const modalCateg = ref(false);
const date = ref("");
const price = ref("");
const category = ref("");
const description = ref("");
const listItems = ref([]);
const logout = ref(false);
const totalPrices = ref([]);
const resTotal = ref();
const modalControl = ref(false);
const modalNewCat = ref(false);
const dataGraph = ref([]);
const listTotal = ref();

const searchItems = ref();
const reloadItems = ref([]);
const controlSearch = ref(true);
// definePageMeta({
//   middleware: ["auth"],
// });

async function getCategories() {
  const { data } = await useFetch(`/api/categories/dbSuperbase`);
  categories.value = data.value.data;

}
async function getItems() {
  const { data, refresh } = await useFetch("/api/listItems/dbSupeItems");
  data.value.data.filter((i) => {
   
    if(i.email === store.emailSession){
      listItems.value.push(i.items);
    }
 
  });

  data.value.data.filter((item) => {
    if(item.email === store.emailSession){
      totalPrices.value.push(
      parseFloat(item.items.price.replaceAll("R$", "").replace(",", ""))
    );

    dataGraph.value.push(item.items);
    dataGraph.value = dataGraph.value.filter((valor, indice, self) => {
      return self.indexOf(valor) === indice;
    });
      
    }
 
  });
  reloadItems.value = listItems.value;
  store.getGraph(dataGraph.value);
  setTimeout(() => {
    store.getGraph(dataGraph.value);
  }, 1000);

  const numeros = totalPrices.value;
  let soma = 0;
  for (let i = 0; i < numeros.length; i++) {
    soma += numeros[i];
  }
  resTotal.value = soma;
}

function createItems() {
  const newDate = date.value.replaceAll("-", "/");
  if (!newDate && !description.value) return;

  const items = {
    date: newDate,
    category: category.value,
    description: description.value,
    price: price.value,
  };

  useFetch(`/api/listItems/dbSupeCreate`, {
    method: "post",
    body: [items, store.emailSession]
  });
  setTimeout(async () => {
    //ok this is as a bad idea iknow, but i searching somthing better than this
    window.location.reload();
  }, 500);
}

const itemsFiltered = computed(() => {
  if (listItems.value && searchItems.value) {
    listItems.value = listItems.value.filter((item) => {
      controlSearch.value = false;
      return item.description
        .toLowerCase()
        .includes(searchItems.value.toLowerCase());
    });
  } else {
    controlSearch.value = true;
    listItems.value = reloadItems.value;
  }
  return listItems.value;
});
function logOutSession() {
  const promise = account.listSessions();

  promise.then(function (response) {
    response.sessions.filter((item) => {
      account.deleteSession(item.$id);
      window.location.reload();
    });
  });
}
getCategories();

onMounted(() => {
  setTimeout(()=>{
    getItems();
  },1000)
});
</script>

<template>
  <LazyMenu />
  <section
    class="w-full flex m-2 overflow-y-scroll rounded-t-3xl bg-gradient-to-b from-[#663399]"
  >
    <div
      class="mx-auto mt-8 w-full xl:w-4/6 rounded-md bg-white shadow-2xl shadow-black bg-opacity-70 p-4"
    >
      <section class="mb-2 w-full">
        <div class="relative flex items-center">
          <input
            type="text"
            v-model="searchItems"
            class="w-52 h-9 my-5 rounded-md pl-8 outline-none"
            placeholder="Procurar..."
          />
          <Icon
            name="mi:search"
            class="absolute left-0 top-8 cursor-pointer ml-2"
          />
          <Icon
            name="mi:notification"
            class="cursor-pointer ml-2 bg-white p-2 rounded-md h-9 w-9"
          />
          <!-- <Icon
            name="mi:settings"
            class="cursor-pointer ml-2 bg-white p-2 rounded-md h-9 w-9"
          /> -->
          <div
            @click="!logout ? (logout = true) : (logout = false)"
            class="h-20 block lg:hidden bg-white absolute rounded-md right-0 px-2 cursor-pointer"
          >
            <div class="relative">
              <div
                v-if="logout"
                class="absolute flex flex-col right-12 bg-[#663399] text-white text-center p-2 rounded-md"
              >
                <NuxtLink
                  to="/"
                  class="hover:bg-blue-200 rounded-mdtransition-all"
                  @click="modal = false"
                  >Home</NuxtLink
                >
                <NuxtLink
                  to="/gastos"
                  class="hover:bg-blue-200 rounded-md transition-all"
                  @click="modal = false"
                  >Gastos</NuxtLink
                >
                <NuxtLink
                  to="/categorias"
                  class="hover:bg-blue-200 rounded-md transition-all"
                  @click="modal = false"
                  >Categorias</NuxtLink
                >
                <NuxtLink to="/auth/login">
                  <p @click="store.closeSession" class="text-red-500 bold">
                    Sair
                  </p>
                </NuxtLink>
              </div>

              <img
                src="https://picsum.photos/200"
                class="rounded-full h-10 w-10 mx-auto my-2 hover:opacity-50 transition duration-500"
              />
              <p class="text-center">{{ store.userName }}</p>
            </div>
          </div>
        </div>
        <div
          v-if="controlSearch"
          class="flex w-full justify-between items-center sm:flex-col flex-col md:flex-col xl:flex-row lg:flex-col 2xl:flex-row"
        >
          <div
            class="h-64 w-full items-center flex justify-center mr-8 rounded-md"
          >
            <Graph class="xl:w-[400px] w-full ml-8" />
          </div>
          <div
            class="h-32 w-40 flex flex-col items-center justify-center rounded-md text-center bg-white"
          >
            <h1 class="font-bold text-gray-700">Total</h1>
            <p>
              -
              <span class="font-semibold text-red-500">{{ resTotal }}</span> R$
            </p>
          </div>
        </div>
      </section>
      <section class="w-full flex-1 border-2 p-2 relative">
        <div
          class="w-full relative flex justify-between flex-col xl:flex-row items-center py-2 px-1 rounded-md mt-16"
        >
          <div class="flex mb-6 bg-white py-1 w-60 rounded-md">
            <div
              class="relative w-60 z-50 justify-center flex flex-col cursor-pointer hover:bg-gray-50 h-9 rounded-md bg-white"
              @click="
                !modalControl ? (modalControl = true) : (modalControl = false)
              "
            >
              <span class="text-center">Selecione</span>
              <Icon
                name="mi:chevron-down"
                class="text-gray-500 hover:text-green-600 cursor-pointer absolute right-3"
              />
              <div
                class="absolute top-9 w-full font-semibold rounded-md bg-blue-950 text-white"
                v-if="modalControl"
              >
                <p
                  class="text-center w-full hover:bg-blue-300"
                  v-for="item in categories"
                  :key="item.id"
                >
                  {{ item.title }}
                </p>
              </div>
            </div>
          </div>

          <div>
            <div
              class="float-right bg-green-800 mb text-white font-semibold rounded-md p-3 cursor-pointer"
              @click="!modalCateg ? (modalCateg = true) : (modalCateg = false)"
            >
              Nova transação
            </div>
          </div>
        </div>
        <div
          class="w-full relative p-2 justify-between flex-col lg:flex-col md:flex-col 2xl:flex-row xl:flex-col items-center flex bg-white bg-opacity-30 pt-2 px-2 rounded-md border-2 border-dotted"
          v-if="modalCateg"
        >
          <div>
            <h1 class="text-[0.8rem] font-semibold text-gray-600">
              Data da transação
            </h1>
            <input
              v-model="date"
              type="date"
              class="px-4 py-1 rounded cursor-pointer outline-none"
            />
          </div>
          <div>
            <h1 class="text-[0.8rem] font-semibold text-gray-600">Valor</h1>
            <input
              v-model="price"
              type="text"
              class="px-4 py-1 rounded outline-none"
            />
          </div>
          <div>
            <h1 class="text-[0.8rem] font-semibold text-gray-600">Descrição</h1>
            <input
              type="text"
              v-model="description"
              class="px-4 py-1 rounded outline-none"
            />
          </div>
          <div>
            <h1 class="text-[0.8rem] font-semibold text-gray-600">Categoria</h1>

            <div class="flex mb-6 bg-white py-1 w-[220px] rounded-md">
              <div
                class="relative w-60 justify-center flex cursor-pointer hover:bg-gray-50 h-6 rounded-md bg-white"
                @click="
                  !modalNewCat ? (modalNewCat = true) : (modalNewCat = false)
                "
              >
                <span
                  class="text-center"
                  v-if="!category ? (category = 'Selecione') : category"
                  >{{ category }}</span
                >
                <Icon
                  name="mi:chevron-down"
                  class="text-gray-500 hover:text-green-600 cursor-pointer absolute right-3"
                />
                <div
                  class="absolute top-7 w-full rounded-md bg-blue-950 text-white font-semibold"
                  v-if="modalNewCat"
                >
                  <p
                    class="text-center w-full hover:bg-blue-300"
                    v-for="item in categories"
                    :key="item.id"
                    @click="category = item.title"
                  >
                    {{ item.title }}
                  </p>
                </div>
              </div>
            </div>
            <div class="bottom-0 right-0 flex gap-4">
              <button
                class="text-green-500 border-[0.1rem] border-green-500 px-2 rounded-md hover:bg-green-500 hover:text-white transition-all"
                @click="createItems"
              >
                Adicionar
              </button>
              <button
                class="text-red-500 border-[0.1rem] border-red-500 px-2 rounded-md hover:bg-red-500 hover:text-white transition-all"
                @click="modalCateg = false"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
        <!-- <div v-if="pending">Loading...</div> -->
        <div
          v-else
          class="grid xl:grid-cols-2 2xl:grid-cols-3 grid-cols-1 gap-2 p-2 max-h-80 overflow-y-scroll"
        >
          <div
            class="mb-2 p-2 flex w-full bg-white rounded-md bg-opacity-50 hover:bg-slate-300 transition-all cursor-pointer shadow shadow-gray-600"
            v-for="item in itemsFiltered"
            :key="item.id"
          >
            <div class="">
              <span class="text-[0.9rem]">
                {{ item.date }}
              </span>
              <p class="text-md">
                <span class="bg-blue-300 text-blue-900 px-[0.2rem] rounded-md">
                  #{{ item.category }}
                </span>
              </p>
            </div>
            <div class="flex w-96 items-center relative text-md">
              <p class="text-center mx-auto absolute right-0 font-semibold">
                {{ item.description }}
              </p>
            </div>
            <div class="flex justify-end w-full items-center">
              <p class="font-bold text-md">
                <Icon name="mi:add" class="text-green-500 ml-2" />
                R${{ item.price }}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  </section>
</template>
