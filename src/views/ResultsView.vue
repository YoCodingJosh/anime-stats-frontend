<script setup lang="ts">
import { computed } from 'vue';
import { useUserDataStore } from '../stores/userData';
import StatusDonut from '@/stats/StatusDonut.vue';

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
    <div class="about">
      <v-avatar :image="userDataStore.profilePictureUrl"></v-avatar>

      <h1>Here is {{ usernamePossessive }} anime stats!</h1>

      <status-donut />
    </div>
  </v-container>
</template>

<style></style>
