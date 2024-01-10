import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useUserDataStore = defineStore('userData', () => {
  const username = ref('');
  const userId = ref<Number>();
  const joinedDate = ref('');
  const profilePictureUrl = ref('');
  const fetchedTimestamp = ref(0);

  function setUsername(name: string) {
    username.value = name;
  }

  function setUserId(id: number) {
    userId.value = id;
  }

  function setJoinedDate(date: string) {
    joinedDate.value = date;
  }

  function setProfilePictureUrl(url: string) {
    profilePictureUrl.value = url;
  }

  function setFetchedTimestamp(timestamp: number) {
    fetchedTimestamp.value = timestamp;
  }

  const accountAge = computed(() => {
    const today = new Date();
    const joined = new Date(joinedDate.value);
    const diff = today.getTime() - joined.getTime();
    const diffDays = Math.ceil(diff / (1000 * 3600 * 24));
    return diffDays;
  });

  const accountAgeInSeconds = computed(() => {
    const today = new Date();
    const joined = new Date(joinedDate.value);
    const diff = today.getTime() - joined.getTime();
    const diffSeconds = Math.ceil(diff / 1000);
    return diffSeconds;
  });

  return {
    username,
    setUsername,
    userId,
    setUserId,
    joinedDate,
    setJoinedDate,
    accountAge,
    accountAgeInSeconds,
    profilePictureUrl,
    setProfilePictureUrl,
    fetchedTimestamp,
    setFetchedTimestamp,
  };
}, {
  persist: true,
});
