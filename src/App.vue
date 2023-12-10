<script setup lang="ts">
import { onMounted } from 'vue';
import { onUnmounted } from 'vue';
import { ref } from 'vue';
import { RouterView } from 'vue-router';
import { useTheme } from 'vuetify';

const theme = useTheme();

const drawer = ref(false);

function setTheme(value: "light" | "dark" | "system") {
  const oldTheme = getTheme();
  localStorage.setItem('theme', value);

  if (value === 'system') {
    theme.global.name.value = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    installThemeWatcher();
  } else {
    theme.global.name.value = value;
    if (oldTheme === 'system') {
      uninstallThemeWatcher();
    }
  }
}

function getTheme(): "light" | "dark" | "system" {
  return localStorage.getItem('theme') as "light" | "dark" | "system";
}

function installThemeWatcher() {
  if (localStorage.getItem('theme') === 'system') {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const listener = (e: MediaQueryListEvent) => {
      theme.global.name.value = e.matches ? 'dark' : 'light';
    };
    media.addEventListener('change', listener);
  }
}

function uninstallThemeWatcher() {
  if (localStorage.getItem('theme') === 'system') {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const listener = (e: MediaQueryListEvent) => {
      theme.global.name.value = e.matches ? 'dark' : 'light';
    };
    media.removeEventListener('change', listener);
  }
}

onMounted(() => {
  installThemeWatcher();
});

onUnmounted(() => {
  uninstallThemeWatcher();
});
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

      <v-spacer />

      <v-menu transition="slide-y-transition" location="bottom">
        <template v-slot:activator="{ props }">
          <v-btn icon v-bind="props">
            <v-icon>mdi-theme-light-dark</v-icon>
            <v-tooltip activator="parent" location="left">Change theme</v-tooltip>
          </v-btn>
        </template>
        <v-list density="compact">
          <v-list-subheader>choose your theme</v-list-subheader>
          <v-list-item @click="setTheme('light')">
            <template v-slot:prepend>
              <v-icon icon="mdi-white-balance-sunny"></v-icon>
            </template>
            <v-list-item-title>Light theme</v-list-item-title>
            <v-list-item-subtitle>enjoy the rays 😎</v-list-item-subtitle>
            <template v-slot:append>
              <v-icon v-if="getTheme() === 'light'">mdi-check-circle</v-icon>
            </template>
          </v-list-item>
          <v-list-item @click="setTheme('dark')">
            <template v-slot:prepend>
              <v-icon icon="mdi-weather-night"></v-icon>
            </template>
            <v-list-item-title>Dark theme</v-list-item-title>
            <v-list-item-subtitle>Embrace the darkness.</v-list-item-subtitle>
            <template v-slot:append>
              <v-icon v-if="getTheme() === 'dark'">mdi-check-circle</v-icon>
              <img class="darkness-gif" src="@/assets/3878_darkness_lewdest.gif" width="32">
            </template>
          </v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-list density="compact">
          <v-list-subheader>or not. i don't care</v-list-subheader>
          <v-list-item @click="setTheme('system')">
            <template v-slot:prepend>
              <v-icon icon="mdi-monitor-shimmer"></v-icon>
            </template>
            <v-list-item-title>System theme</v-list-item-title>
            <v-list-item-subtitle>bonus: will sync with your system!</v-list-item-subtitle>
            <template v-slot:append>
              <v-icon v-if="getTheme() === 'system'">mdi-check-circle</v-icon>
            </template>
          </v-list-item>
        </v-list>
      </v-menu>
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
  background-color: deep-purple !important;
}

.darkness-gif {
  margin-left: 4px;
}
</style>
