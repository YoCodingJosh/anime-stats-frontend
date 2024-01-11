import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useAppStateStore = defineStore('appState', () => {
  const malAvailable = ref(true); // be an optimist :)
  const backendAvailable = ref(true); // still an optimist :)

  function setMalAvailable(available: boolean) {
    malAvailable.value = available;
  }

  function setBackendAvailable(available: boolean) {
    backendAvailable.value = available;
  }

  // computed value that is the string of the current system status (MAL, backend, etc.)
  const systemStatus = computed(() => {
    // TODO: make better messages
    if (malAvailable.value && backendAvailable.value) {
      return 'All systems operational';
    } else if (!malAvailable.value && backendAvailable.value) {
      return 'MyAnimeList is down';
    } else if (malAvailable.value && !backendAvailable.value) {
      return 'Backend is down';
    } else {
      return 'MAL and backend are down';
    }
  });

  const isSystemOperational = computed(() => {
    return malAvailable.value && backendAvailable.value;
  });

  return {
    malAvailable,
    setMalAvailable,
    backendAvailable,
    setBackendAvailable,
    systemStatus,
    isSystemOperational,
  };
});
