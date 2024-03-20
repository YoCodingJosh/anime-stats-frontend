<template>
  <v-container>
    <div class="about">
      <h1>This is an about page</h1>
      <anime-gif image-key="yuyushiki-what" :show-anime-details="true"></anime-gif>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import AnimeGif from '@/components/AnimeGif.vue';
</script>

<style></style>
