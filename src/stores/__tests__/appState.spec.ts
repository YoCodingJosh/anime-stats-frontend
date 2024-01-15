import { setActivePinia, createPinia } from 'pinia';
import { describe, it, expect, beforeEach } from 'vitest';
import { useAppStateStore } from '../appState';

describe('App State Store', () => {
  beforeEach(() => {
    // creates a fresh pinia and makes it active
    // so it's automatically picked up by any useStore() call
    // without having to pass it to it: `useStore(pinia)`
    setActivePinia(createPinia());
  });

  it('has the correct system status for a given MAL and Backend status', () => {
    const appState = useAppStateStore();
    appState.setMalAvailable(true);
    appState.setBackendAvailable(true);

    expect(appState.systemStatus).toBe('All systems operational');

    appState.setMalAvailable(false);
    appState.setBackendAvailable(true);

    expect(appState.systemStatus).toBe('MyAnimeList is down');

    appState.setMalAvailable(true);
    appState.setBackendAvailable(false);

    expect(appState.systemStatus).toBe('Backend is down');

    appState.setMalAvailable(false);
    appState.setBackendAvailable(false);

    expect(appState.systemStatus).toBe('MAL and backend are down');
  });

  it('isSystemOperational should have the correct value for a given MAL and Backend status', () => {
    const appState = useAppStateStore();

    appState.setMalAvailable(true);
    appState.setBackendAvailable(true);

    expect(appState.isSystemOperational).toBe(true);

    appState.setMalAvailable(false);
    appState.setBackendAvailable(true);

    expect(appState.isSystemOperational).toBe(false);

    appState.setMalAvailable(true);
    appState.setBackendAvailable(false);

    expect(appState.isSystemOperational).toBe(false);
  });
});
