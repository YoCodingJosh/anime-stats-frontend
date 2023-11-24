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

  // await userDataStore.fetch();
});
</script>

<template>
  <v-container>
    <p>yo {{ userDataStore.username }}</p>
  </v-container>
</template>

<style scoped>
</style>
