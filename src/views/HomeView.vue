<script setup lang="ts">
import { ref } from 'vue'

const username = ref('');

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

healthCheck();
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
            <v-text-field v-model="username" label="Username" outlined dense placeholder="CodingJosh"></v-text-field>
            <v-btn block class="text-none mb-4" color="indigo-darken-1" size="x-large" variant="flat"
              @click="() => $router.push(`/user/${username}`)">Go</v-btn>
          </template>
        </v-card>
      </div>
    </main>
  </v-container>
</template>
