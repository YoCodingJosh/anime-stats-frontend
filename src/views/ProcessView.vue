<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

import { useUserDataStore } from '@/stores/userData';

import AnimeGif from '@/components/AnimeGif.vue';

const userDataStore = useUserDataStore();
const router = useRouter();

const isLoading = ref(true);
const isUserListPrivate = ref(false);

onMounted(async () => {
  if (!userDataStore.username) {
    // TODO: send a toast message
    router.push('/');
    return;
  }

  fetch(`${import.meta.env.VITE_BACKEND_URL}/api/${userDataStore.username}/raw-data`)
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
      console.log(data);
      isLoading.value = false;
    });
});
</script>

<template>
  <v-container fill-height>
    <v-row align="center" justify="center">
      <v-col>
        <v-avatar :image="userDataStore.profilePictureUrl"></v-avatar>
        <p>Hey {{ userDataStore.username }}!</p>
        <div v-if="isLoading" class="d-flex flex-column justify-center align-center">
          <h1 class="my-3">Processing...</h1>
          <v-progress-circular indeterminate></v-progress-circular>
        </div>
        <div v-else-if="isUserListPrivate" class="d-flex flex-column justify-center align-center">
          <h1 class="my-3">User list is private</h1>
          <p>Change your list privacy settings to public and try again</p>
          <v-btn class="my-6" color="primary" @click="router.push('/')">Go back</v-btn>
        </div>
        <div v-else>
          <h1 class="my-3">TODO:</h1>
          <anime-gif image-key="yuyushiki-what" :show-anime-details="false"></anime-gif>
        </div>
      </v-col>
      <v-col></v-col>
      <v-col></v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
</style>
