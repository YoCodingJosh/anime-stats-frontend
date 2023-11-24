import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useUserDataStore = defineStore('userData', () => {
  const username = ref('');

  function setUsername(name: string) {
    username.value = name;
  }

  return {
    username,
    setUsername,
  };
});
