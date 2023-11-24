<script setup lang="ts">
import { onMounted } from 'vue';
import { ref } from 'vue'
import type { Router } from 'vue-router';
import { useUserDataStore } from '../stores/userData';

const username = ref('');
const isSubmitted = ref(false);

const userDataStore = useUserDataStore();

const backendUrl = import.meta.env.VITE_BACKEND_URL as string;

const healthCheck = async () => {
  try {
    const response = await fetch(`${backendUrl}/health`);
    if (response.status !== 200) {
      throw new Error('Backend is down');
    }
  } catch (error) {
    console.error(error);
    // TODO: Show error message
  }
}

onMounted(async () => {
  await healthCheck();
});

const start = (router: Router) => {
  isSubmitted.value = true;

  if (username.value === '') {
    return;
  }

  isSubmitted.value = false;

  userDataStore.setUsername(username.value);

  router.push(`/process`);
};
</script>

<template>
  <v-container>
    <header>
      <h1>Welcome!</h1>
    </header>
    <main>
      <p>
        This is the home page. You can edit the content of this page by editing
        <code>src/views/HomeView.vue</code>.
      </p>
      <br />
      <div class="d-flex align-center flex-column">
        <v-card width="450">
          <template v-slot:title>
            Let's do this!
          </template>

          <template v-slot:subtitle>
            Enter your username and let's start crunching some numbers!
          </template>

          <template v-slot:text>
            <p v-if="isSubmitted && username === ''" class="mb-4 text-red-lighten-1">Please enter a username</p>
            <v-text-field v-model="username" label="Username" outlined dense placeholder="CodingJosh"
              aria-required="true"></v-text-field>
            <v-btn block class="text-none mb-4" color="indigo-darken-1" size="x-large" variant="flat"
              @click="() => start($router)">Go</v-btn>
          </template>
        </v-card>
      </div>
    </main>
  </v-container>
</template>
