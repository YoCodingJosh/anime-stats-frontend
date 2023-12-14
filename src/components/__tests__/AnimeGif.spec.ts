import { describe, it, expect, vi, beforeEach } from 'vitest';
import { flushPromises, mount } from '@vue/test-utils';
import AnimeGif from '@/components/AnimeGif.vue';
import { createPinia, setActivePinia } from 'pinia';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

const vuetify = createVuetify({
  components,
  directives,
});

describe('AnimeGif.vue', () => {
  beforeEach(() => {
    // creates a fresh pinia and makes it active
    // so it's automatically picked up by any useStore() call
    // without having to pass it to it: `useStore(pinia)`
    setActivePinia(createPinia());
  });

  it('renders without crashing', () => {
    const wrapper = mount(AnimeGif, {
      props: {
        imageKey: 'bocchi-glitch',
      },
      global: {
        plugins: [vuetify],
      },
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('throws an error if neither imageKey nor applicableTag are provided', () => {
    expect(() => {
      mount(AnimeGif);
    }).toThrow('Must use either imageKey or applicableTag');
  });

  it('throws an error if both imageKey and applicableTag are provided', () => {
    expect(() => {
      mount(AnimeGif, {
        props: {
          imageKey: 'testKey',
          applicableTag: 'testTag',
        },
        global: {
          plugins: [vuetify],
        },
      });
    }).toThrow('Cannot use both imageKey and applicableTag');
  });

  it('throws an error if an invalid imageKey is provided', () => {
    expect(() => {
      mount(AnimeGif, {
        props: {
          imageKey: 'invalidKey',
        },
        global: {
          plugins: [vuetify],
        },
      });
    }).toThrow('Could not find image with key invalidKey');
  });

  it('displays the correct anime title for the imageKey', async () => {
    const wrapper = mount(AnimeGif, {
      props: {
        imageKey: 'bocchi-glitch',
      },
      global: {
        plugins: [vuetify],
      },
    });

    await flushPromises();

    expect(wrapper.find('.anime-title').text()).toBe('Bocchi the Rock!');
  });

  it('displays the anime score, and genres when showAnimeDetails is true', async () => {
    const mockData = {
      data: {
        score: 7.35,
        genres: ['Comedy'],
        themes: ['CGDCT', 'Gag Humor', 'School'],
        images: {
          jpg: {
            image_url: 'testImageUrl',
          },
        },
      },
    };

    vi.spyOn(global, 'fetch').mockResolvedValueOnce(
      new Response(
        JSON.stringify(mockData)
      )
    );

    const wrapper = mount(AnimeGif, {
      props: {
        imageKey: 'yuyushiki-what',
        showAnimeDetails: true,
      },
      global: {
        plugins: [vuetify],
      },
    });

    await flushPromises();

    console.log(wrapper.html());

    expect(global.fetch).toHaveBeenCalledTimes(1);

    expect(wrapper.find('.anime-score').text()).toBe('7.35');
    expect(wrapper.findAll('.v-chip').length).toBe(4);
  });

  it('displays the watch button when showWatchButton is true', () => {
    const wrapper = mount(AnimeGif, {
      props: {
        imageKey: 'shamiko-jump',
        showWatchButton: true,
      },
      global: {
        plugins: [vuetify],
      },
    });

    expect(wrapper.find('.mdi-movie-open-play').exists()).toBe(true);
  });
});
