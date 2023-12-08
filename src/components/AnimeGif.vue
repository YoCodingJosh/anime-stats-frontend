<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type GifsJson from './AnimeGifData';
import type { AnimeDetail } from './AnimeGifData';

import data from '@/assets/gifs.json';

const props = defineProps({
  /**
   * The key of the image to display.
   */
  imageKey: {
    type: String,
    required: false,
  },

  /**
   * The tag to use to get a random image from that set.
   */
  applicableTag: {
    type: String,
    required: false,
  },

  /**
   * Whether to show the anime icon or not. The anime icon is a thumbnail of the anime image from MyAnimeList.
   * 
   * Note: This will cause an additional request to MyAnimeList/Jikan. Only one request if combined with `showAnimeDetails` ;)
   */
  showAnimeIcon: {
    type: Boolean,
    required: false,
    default: true,
  },

  /**
   * Whether to show the watch button. The watch button will take the user to an offical streaming site (Crunchyroll or HIDIVE)
   */
  showWatchButton: {
    type: Boolean,
    required: false,
    default: false,
  },

  /**
   * Show the anime details like genres, release date, format, etc.
   * 
   * Note: This will cause an additional request to MyAnimeList/Jikan. Only one request if combined with `showAnimeIcon` ;)
   */
  showAnimeDetails: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const imageUrl = ref('');
const imageWidth = ref(0);
const imageHeight = ref(0);
const animeTitle = ref('');
const animeMalUrl = ref('');

onMounted(() => {
  if (props.imageKey && props.applicableTag) {
    throw new Error('Cannot use both imageKey and applicableTag');
  }

  if (!props.imageKey && !props.applicableTag) {
    throw new Error('Must use either imageKey or applicableTag');
  }

  const animeGifData: GifsJson = data;

  // either get a random image or get the image from the key or a random image from the tag
  if (props.imageKey) {
    const image = animeGifData.gifs.find((gif) => gif.name === props.imageKey);

    if (!image) {
      throw new Error(`Could not find image with key ${props.imageKey}`);
    }

    imageUrl.value = image.file;
    imageWidth.value = image.width;
    imageHeight.value = image.height;

    const animeDetail: AnimeDetail = animeGifData.anime_details[image.mal_id];

    animeTitle.value = animeDetail.title;
    animeMalUrl.value = `https://myanimelist.net/anime/${image.mal_id}`;
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
  <v-card :max-width="imageWidth">
    <v-img :src="`/gifs/${imageUrl}`" :max-width="imageWidth" :max-height="imageHeight"></v-img>
    <v-card-title>
      <a :href="animeMalUrl" target="_blank" rel="noopener noreferrer">{{ animeTitle }}</a>
    </v-card-title>

    <v-card-subtitle>
      genres go here
    </v-card-subtitle>
  </v-card>
</template>

<style scoped></style>
