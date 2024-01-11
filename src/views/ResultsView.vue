<script setup lang="ts">
import { computed } from 'vue';
import { useUserDataStore } from '../stores/userData';

const userDataStore = useUserDataStore();

// username's possessive form (be sure to think about the edge case of usernames ending with s)
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
      <h1>Here is {{ usernamePossessive }} anime stats!</h1>
    </div>
  </v-container>
</template>

<style></style>
