<script setup lang="ts">
import { onMounted, ref, defineProps } from 'vue';
import type GifsJson from './AnimeGifData';

import data from '@/assets/gifs.json';

const props = defineProps({
  imageKey: {
    type: String,
    required: false,
  },

  applicableTag: {
    type: String,
    required: false,
  },

  maxWidth: {
    type: String,
    required: false,
    default: '100%',
  },

  maxHeight: {
    type: String,
    required: false,
    default: '100%',
  },
});

const imageUrl = ref('');
const imageWidth = ref(0);
const imageHeight = ref(0);

onMounted(() => {
  const animeGifData: GifsJson = data;

  // either get a random image or get the image from the key or a random image from the tag
  if (props.imageKey) {
    const image = animeGifData.gifs.find((gif) => gif.name === props.imageKey);
    imageUrl.value = image?.file ?? '';
    imageWidth.value = image?.width ?? 0;
    imageHeight.value = image?.height ?? 0;
  } else if (props.applicableTag) {
    const applicableGifs = Object.entries(animeGifData).filter(([, tags]) => tags.includes(props.applicableTag));
    const randomApplicableGif = applicableGifs[Math.floor(Math.random() * applicableGifs.length)];
    imageUrl.value = randomApplicableGif[1];
    imageWidth.value = randomApplicableGif[1].width;
    imageHeight.value = randomApplicableGif[1].height;
  } else {
    const randomGif = Object.entries(animeGifData)[Math.floor(Math.random() * Object.entries(animeGifData).length)];
    imageUrl.value = randomGif[1];
    imageWidth.value = randomGif[1].width;
    imageHeight.value = randomGif[1].height;
  }
});
</script>

<template>
  <v-card>
    <v-img :src="`/gifs/${imageUrl}`" :max-width="imageWidth" :max-height="imageHeight"></v-img>
  </v-card>

  <v-card-title>
    TODO:
  </v-card-title>

  <v-card-subtitle>
    also TODO:
  </v-card-subtitle>
</template>

<style scoped>
</style>
