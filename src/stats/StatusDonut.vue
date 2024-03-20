<template>
  <v-card>
    <!-- <Doughnut :data="data" :options="options" /> -->
    <VueApexCharts width="380" type="donut" :options="apexOptions" :series="series"></VueApexCharts>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'vue-chartjs';
import VueApexCharts from 'vue3-apexcharts';

import { useStatsDataStore } from '@/stores/statsData';

const statId = "72A8BFC4-13BA-4AEA-AC47-69442ECFEC96";

const statsDataStore = useStatsDataStore();

const series = ref([
  statsDataStore.getStatsData(statId).watching.count,
  statsDataStore.getStatsData(statId).completed.count,
  statsDataStore.getStatsData(statId).onHold.count,
  statsDataStore.getStatsData(statId).dropped.count,
  statsDataStore.getStatsData(statId).planToWatch.count,
]);

const apexOptions = ref({
  chart: {
    type: 'donut',
  },
  labels: ['Watching', 'Completed', 'On Hold', 'Dropped', 'Plan to Watch'],
  colors: ['#338543', '#2d4276', '#c9a31f', '#832f30', '#747474'],
});

ChartJS.register(ArcElement, Tooltip, Legend);

const data = ref({
  labels: ['Watching', 'Completed', 'On Hold', 'Dropped', 'Plan to Watch'],
  datasets: [
    {
      data: [
        statsDataStore.getStatsData(statId).watching.count,
        statsDataStore.getStatsData(statId).completed.count,
        statsDataStore.getStatsData(statId).onHold.count,
        statsDataStore.getStatsData(statId).dropped.count,
        statsDataStore.getStatsData(statId).planToWatch.count,
      ],
      backgroundColor: ['#338543', '#2d4276', '#c9a31f', '#832f30', '#747474'],
    },
  ],
});

const options = ref({
  responsive: true,
  maintainAspectRatio: false,
});
</script>

<style scoped>
</style>
