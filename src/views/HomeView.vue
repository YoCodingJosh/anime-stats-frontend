<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router';
import { useUserDataStore } from '../stores/userData';
import { useAppStateStore } from '../stores/appState';

const username = ref('');
const isSubmitted = ref(false);
const loading = ref(false);
const error = ref(null as string | null);

const router = useRouter();
const userDataStore = useUserDataStore();
const appStateStore = useAppStateStore();

const backendUrl = import.meta.env.VITE_BACKEND_URL as string;

const rules = [
  (v: string) => !!v || 'Username is required',
];

interface BasicInfoError {
  message: string;
  ok: boolean;
}

interface BasicInfoResponse {
  data: {
    username: string;
    mal_id: number;
    userUrl: string;
    images: {
      jpg: {
        image_url: string;
      },
      webp: {
        image_url: string;
      }
    };
    joined: string;
  }
}

const start = async () => {
  error.value = null;
  isSubmitted.value = true;

  if (username.value === '') {
    return;
  }

  loading.value = true;

  // get the user's basic info first, this will also check if the user exists
  const response = await fetch(`${backendUrl}/api/${username.value}`);
  const data: BasicInfoResponse | BasicInfoError = await response.json();

  if ('ok' in data && !data.ok) {
    error.value = data.message;
    loading.value = false;

    return;
  }

  const userData = data as BasicInfoResponse;

  userDataStore.setUsername(userData.data.username);
  userDataStore.setUserId(userData.data.mal_id);
  userDataStore.setJoinedDate(userData.data.joined);
  userDataStore.setProfilePictureUrl(userData.data.images.jpg.image_url ?? "https://cdn.myanimelist.net/images/kaomoji_mal_white.png");

  userDataStore.setFetchedTimestamp(new Date().getTime());

  router.push(`/process`);
};
</script>

<template>
  <v-container>
    <header>
      <h1>Welcome!</h1>
    </header>
    <main>
      <v-alert v-if="!appStateStore.isSystemOperational" :text="appStateStore.systemStatus" type="error"></v-alert>
      <div class="d-flex align-center flex-column">
        <v-card width="auto">
          <template v-slot:title>
            Let's do this!
          </template>

          <template v-slot:subtitle>
            Enter your username and let's crunch some numbers!
          </template>

          <template v-slot:text>
            <v-form @submit.prevent :disabled="loading || !appStateStore.isSystemOperational">
              <p v-if="isSubmitted && error" class="mb-4 text-red-lighten-1">{{ error }}</p>
              <v-text-field v-model="username" label="MyAnimeList Username" outlined dense placeholder="CodingJosh"
                :rules="rules"></v-text-field>
              <v-btn type="submit" block class="mt-2" color="indigo-darken-1" size="x-large" variant="flat"
                @click="async () => start()">
                <span v-if="loading">
                  <v-progress-circular indeterminate color="white"></v-progress-circular>
                </span>
                <span v-else>Go</span>
              </v-btn>
            </v-form>
          </template>
        </v-card>
      </div>
    </main>
  </v-container>
</template>
