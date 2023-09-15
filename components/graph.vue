<script  setup>
import { Bar } from 'vue-chartjs';
import {useDatabase} from "../stores/request";
const dataStore = ref([])
const store = useDatabase()
const date = ref([])
const price = ref([]);
const colors = ref('')
const props = defineProps({
  propDate:String
})
const data = new Date()
 function getdataArr(){
  dataStore.value =  store.duplicados[0]
  if(!dataStore.value) return;
  dataStore.value.filter(item=>{
   date.value.push([item.total[0].slice(8,15)])
   price.value.push(item.total[1])
  })
}

const chartData = ref({
  labels: date,
  datasets: [
    {
      label: `Grafico Diario` ,
      backgroundColor: '#f87979',
      data: price,
    },
  ],
})
const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
})
getdataArr()
</script>
<template>
  <div class="relative ">
    <h2 class="text-[0.6rem] left-1 absolute">{{data.toLocaleDateString() }}</h2>
    <Bar
      :data="chartData"
      :options="chartOptions"
      class="bg-gray-100  rounded-md "
      
    />
   
  </div>
</template>