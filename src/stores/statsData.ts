import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useStatsDataStore = defineStore('statsData', () => {
  const fetchedTimestamp = ref(0);
  const availableStats = ref<string[]>([]);
  const statsData = ref<Record<string, any>>({});

  function setFetchedTimestamp(timestamp: number) {
    fetchedTimestamp.value = timestamp;
  }

  function getFetchedTimestamp() {
    return fetchedTimestamp.value;
  }

  function getStatsData(stat: string) {
    return statsData.value[stat];
  }

  function setStatsData(stat: string, data: any) {
    statsData.value[stat] = data;
  }

  function getAvailableStats() {
    return availableStats.value;
  }

  function setAvailableStats(stats: string[]) {
    availableStats.value = stats;
  }

  const statsDataAvailable = computed(() => {
    return availableStats.value.length > 0 && Object.keys(statsData.value).length > 0;
  });

  return {
    availableStats,
    statsData,
    fetchedTimestamp,
    setFetchedTimestamp,
    getFetchedTimestamp,
    getStatsData,
    setStatsData,
    getAvailableStats,
    setAvailableStats,
    statsDataAvailable,
  };
}, {
  persist: true,
});
