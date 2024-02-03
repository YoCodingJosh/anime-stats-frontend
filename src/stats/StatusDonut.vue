<template>
  <v-card>
    <Doughnut :data="data" :options="options" />
  </v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'vue-chartjs';

ChartJS.register(ArcElement, Tooltip, Legend);

const data = ref({
  labels: ['Watching', 'Completed', 'On Hold', 'Dropped', 'Plan to Watch'],
  datasets: [
    {
      label: 'Anime Status',
      data: [300, 50, 100, 40, 120], // TODO: replace with real data from the statsData store
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
.watching {
  color: #338543;
}

.completed {
  color: #2d4276;
}

.on_hold {
  color: #c9a31f;
}

.dropped {
  color: #832f30;
}

.plan_to_watch {
  color: #747474;
}
</style>
