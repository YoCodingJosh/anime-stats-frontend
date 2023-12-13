<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type GifsJson from './AnimeGifData';
import type { AnimeDetail } from './AnimeGifData';

import data from '@/assets/gifs.json';

import { useCachedDataStore } from '@/stores/cachedData';

const cachedDataStore = useCachedDataStore();

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
   * Note: The data is cached for 24 hours.
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
   * Note: The data is cached for 24 hours.
   */
  showAnimeDetails: {
    type: Boolean,
    required: false,
    default: true,
  },
});

const imageUrl = ref('');
const imageWidth = ref(0);
const imageHeight = ref(0);
const animeTitle = ref('');
const animeMalUrl = ref('');
const animeCopyright = ref('');
const animeWatchUrl = ref('');
const animeMalId = ref(0);
const animeGenres = ref<string[]>([]);
const animeScore = ref(0);
const animeImageUrl = ref('');

const isLoading = ref(true);

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
    animeCopyright.value = animeDetail.copyright;
    animeWatchUrl.value = animeDetail.link_to_watch;
    animeMalId.value = image.mal_id;
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

  if ((props.showAnimeIcon || props.showAnimeDetails)) {
    const cachedAnimeData = cachedDataStore.getAnimeData(animeMalId.value);

    const isStale = cachedAnimeData && cachedAnimeData.fetchedTimestamp + 86400 < Math.floor(Date.now() / 1000);

    if (cachedAnimeData && !isStale) {
      if (props.showAnimeDetails) {
        animeScore.value = cachedAnimeData.score;
        animeGenres.value = [...cachedAnimeData.genres, ...cachedAnimeData.themes];
        animeImageUrl.value = cachedAnimeData.animeImageUrl;
      }

      isLoading.value = false;
    } else {
      fetch(`https://api.jikan.moe/v4/anime/${animeMalId.value}`)
        .then((response) => response.json())
        .then((data) => {
          const animeData = data.data;

          if (props.showAnimeIcon) {
            animeImageUrl.value = animeData.images.jpg.image_url;
          }

          if (props.showAnimeDetails) {
            animeScore.value = animeData.score;

            // combine the genres and themes
            animeGenres.value = [...animeData.genres.map((genre: any) => genre.name), ...animeData.themes.map((theme: any) => theme.name)];
          }

          cachedDataStore.setAnimeData(animeMalId.value, {
            score: animeData.score,
            genres: animeData.genres.map((genre: any) => genre.name),
            themes: animeData.themes.map((theme: any) => theme.name),
            animeImageUrl: animeData.images.jpg.image_url,
            fetchedTimestamp: Math.floor(Date.now() / 1000),
          });
        });

      isLoading.value = false;
    }
  }
});
</script>

<template>
  <v-card :max-width="imageWidth" :loading="isLoading">
    <v-img :src="`/gifs/${imageUrl}`" :max-width="imageWidth" :max-height="imageHeight"></v-img>
    <v-card-title>
      <v-row>
        <v-col cols="9">
          <a :href="animeMalUrl" target="_blank" rel="noopener noreferrer">{{ animeTitle }}</a>
        </v-col>
        <v-col class="d-flex" cols="3">
          <v-spacer />
          {{ animeScore }} <v-icon>mdi-star</v-icon>
        </v-col>
      </v-row>
    </v-card-title>

    <v-card-text>
      <v-row>
        <v-col cols="12" md="9">
          <v-chip-group disabled v-if="showAnimeDetails">
            <v-chip size="small" v-for="genre in animeGenres" :key="genre">{{ genre }}</v-chip>
          </v-chip-group>
        </v-col>
        <v-col class="d-flex" cols="12" md="3">
          <v-spacer />
          <v-btn v-if="showWatchButton" :href="animeWatchUrl" target="_blank" variant="tonal" size="large" icon
            outlined><v-icon size="large">mdi-movie-open-play</v-icon></v-btn>
        </v-col>
      </v-row>
    </v-card-text>

    <v-card-subtitle>
      &copy; {{ animeCopyright }}
    </v-card-subtitle>
  </v-card>
</template>

<style scoped>
</style>
