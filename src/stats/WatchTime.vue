<script setup lang="ts">
import { ref, computed } from 'vue';

import { useStatsDataStore } from '@/stores/statsData';

const statsDataStore = useStatsDataStore();

const shrekDuration = 90 * 60; // shrek is 90 minutes long but in seconds
const shrekDurationWithCredits = shrekDuration + (5 * 60); // the credits are 5 minutes long but in seconds

const numberOfShrekWatchesWithCredits = computed(() => {
  return statsDataStore.getStatsData('72A8BFC4-13BA-4AEA-AC47-69442ECFEC96').grandTotalDuration / shrekDurationWithCredits;
});

const numberOfShrekWatches = computed(() => {
  return statsDataStore.getStatsData('72A8BFC4-13BA-4AEA-AC47-69442ECFEC96').grandTotalDuration / shrekDuration;
});
</script>

<template>
  <!-- TODO other watch time related stats -->
  <v-card width="250">
    <v-card-title>It's all ogre now!</v-card-title>
    <v-card-text>
      <p>
        You could have watched Shrek <b>{{ numberOfShrekWatches.toFixed(0) }}</b> times - or <b>{{ numberOfShrekWatchesWithCredits.toFixed(0) }}</b> times with credits!
      </p>
    </v-card-text>
  </v-card>
</template>

<style scoped>
</style>
