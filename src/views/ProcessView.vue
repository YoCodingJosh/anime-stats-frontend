<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

import { useUserDataStore } from '@/stores/userData';
import { useStatsDataStore } from '@/stores/statsData';

const userDataStore = useUserDataStore();
const statsDataStore = useStatsDataStore();
const router = useRouter();

const isLoading = ref(true);
const isUserListPrivate = ref(false);

const loadingMessage = ref('Processing...');

onMounted(async () => {
  if (!userDataStore.username) {
    // TODO: send a toast message
    router.push('/');
    return;
  }

  const rawData = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/${userDataStore.username}/raw-data`)
    .then((response) => {
      if (!response.ok) {
        if (response.status === 403) {
          isLoading.value = false;
          isUserListPrivate.value = true;
        } else {
          throw new Error('Something went wrong');
        }
      }
      return response.json();
    })
    .then((data) => {
      loadingMessage.value = 'Crunching stats...';

      return data;
    });

  console.log("Raw data: ", rawData);

  const stats = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/${userDataStore.username}/stats`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(rawData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Something went wrong');
      }
      return response.json();
    })
    .then((data) => {
      isLoading.value = false;

      statsDataStore.setFetchedTimestamp(new Date().getTime());
      statsDataStore.setAvailableStats(data.availableStats);

      const stats = data.stats;

      Object.keys(stats).forEach((key) => {
        statsDataStore.setStatsData(key, stats[key]);
      });

      return data;
    });

  console.log("Stats: ", stats);

  router.push('/results');
});
</script>

<template>
  <v-container fill-height>
    <v-row align="center" justify="center">
      <v-col>
        <v-avatar :image="userDataStore.profilePictureUrl" size="48"></v-avatar>
        <p>Hey {{ userDataStore.username }}!</p>
        <div v-if="isLoading" class="d-flex flex-column justify-center align-center">
          <h1 class="my-3">{{ loadingMessage }}</h1>
          <v-progress-circular indeterminate></v-progress-circular>
        </div>
        <div v-else-if="isUserListPrivate" class="d-flex flex-column justify-center align-center">
          <h1 class="my-3">User list is private</h1>
          <p>Change your list privacy settings to public and try again</p>
          <v-btn class="my-6" color="primary" @click="router.push('/')">Go back</v-btn>
        </div>
      </v-col>
      <v-col></v-col>
      <v-col></v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
</style>
