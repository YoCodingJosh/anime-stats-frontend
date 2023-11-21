<script setup lang="ts">
import { RouterView } from 'vue-router'

import { ref } from 'vue'

const drawer = ref(false)
</script>

<script lang="ts">
export default {
  data: () => ({ drawer: false }),
}
</script>

<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" class="bg-deep-purple-lighten-1" theme="dark">
      <v-list color="transparent">
        <v-list-item link title="Home" to="/"></v-list-item>
        <v-list-item link title="About" to="/about"></v-list-item>
      </v-list>
      <template v-slot:append>
        <div class="pa-2 ">
          <h2 class="text-center">（＾ｖ＾）</h2>
        </div>
      </template>
    </v-navigation-drawer>

    <v-app-bar>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-app-bar-title>CodingJosh's Anime Stats</v-app-bar-title>
    </v-app-bar>

    <v-main>
      <RouterView />
    </v-main>

    <v-footer app border>
      <v-row justify="center" no-gutters>
        <v-col class="text-center">
          <router-link to="/privacy">Privacy Policy</router-link>
          &bull;
          <router-link to="/terms">Terms of Service</router-link>
        </v-col>
        <v-col class="text-center mt-4" cols="12">
          &copy; {{ new Date().getFullYear() }} CodingJosh
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<style scoped>
.v-list-item--active {
  color: white !important;
  /* Change this to whatever color you want */
  background-color: deep-purple !important;
  /* Change this to whatever color you want */
}
</style>
