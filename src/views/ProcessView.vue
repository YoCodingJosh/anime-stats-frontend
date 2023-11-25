<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

import { useUserDataStore } from '@/stores/userData';

const userDataStore = useUserDataStore();
const router = useRouter();

onMounted(async () => {
  if (!userDataStore.username) {
    // TODO: send a toast message
    router.push('/');
    return;
  }

  fetch(`${import.meta.env.VITE_BACKEND_URL}/api/${userDataStore.username}/raw-data`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    });
});
</script>

<template>
  <v-container>
    <v-avatar :image="userDataStore.profilePictureUrl"></v-avatar>
    <p>{{ userDataStore.username }}</p>
    <h1>Processing data...</h1>
    <v-progress-circular indeterminate></v-progress-circular>
  </v-container>
</template>

<style scoped>
</style>
