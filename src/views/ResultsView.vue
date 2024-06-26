<script setup lang="ts">
import { computed } from 'vue';

import { useUserDataStore } from '../stores/userData';

import StatusDonut from '@/stats/StatusDonut.vue';
import WatchTime from '@/stats/WatchTime.vue';

const userDataStore = useUserDataStore();

const usernamePossessive = computed(() => {
  if (userDataStore.username === '') {
    return '';
  }

  if (userDataStore.username.endsWith('s')) {
    return `${userDataStore.username}'`;
  }

  return `${userDataStore.username}'s`;
});
</script>

<template>
  <v-container>
    <div class="results">
      <v-avatar :image="userDataStore.profilePictureUrl" size="48"></v-avatar>

      <h1>Here is {{ usernamePossessive }} anime stats!</h1>

      <status-donut />
      <watch-time />
    </div>
  </v-container>
</template>

<style></style>
