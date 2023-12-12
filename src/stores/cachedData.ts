import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useCachedDataStore = defineStore('cachedData', () => {
  const cachedData = ref<Record<number, any>>({});

  function getAnimeData(malId: number) {
    return cachedData.value[malId];
  }

  function setAnimeData(malId: number, data: any) {
    cachedData.value[malId] = data;
  }

  return {
    cachedData,
    setAnimeData,
    getAnimeData,
  };
});
