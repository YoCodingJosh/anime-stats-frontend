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
      <v-row justify="space-around" no-gutters>
        <v-col class="text-center">
          <v-dialog transition="dialog-bottom-transition" width="auto">
            <template v-slot:activator="{ props }">
              <v-btn v-bind="props">Privacy Policy</v-btn>
            </template>
            <template v-slot:default="{ isActive }">
              <v-card>
                <v-toolbar color="primary" title="Privacy Policy"></v-toolbar>
                <v-card-text>
                  <div class="text-h2 pa-12">TODO</div>
                </v-card-text>
                <v-card-actions class="justify-end">
                  <v-btn variant="text" @click="isActive.value = false">Close</v-btn>
                </v-card-actions>
              </v-card>
            </template>
          </v-dialog>
        </v-col>
        <v-col class="text-center">
          <v-dialog transition="dialog-bottom-transition" width="auto">
            <template v-slot:activator="{ props }">
              <v-btn v-bind="props">Terms of Service</v-btn>
            </template>
            <template v-slot:default="{ isActive }">
              <v-card>
                <v-toolbar color="primary" title="Terms of Service"></v-toolbar>
                <v-card-text>
                  <div class="text-h2 pa-12">TODO</div>
                </v-card-text>
                <v-card-actions class="justify-end">
                  <v-btn variant="text" @click="isActive.value = false">Close</v-btn>
                </v-card-actions>
              </v-card>
            </template>
          </v-dialog>
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
