import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

import { useUserDataStore } from '@/stores/userData';
import { useStatsDataStore } from '@/stores/statsData';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/process',
      name: 'process',
      component: () => import('../views/ProcessView.vue'),
      beforeEnter: (to, from, next) => {
        const userStore = useUserDataStore();

        if (userStore.userId) {
          next();
        } else {
          // TODO: show a toast or something
          next('/');
        }
      }
    },
    {
      path: '/results',
      name: 'results',
      component: () => import('../views/ResultsView.vue'),
      beforeEnter: (to, from, next) => {
        const statsStore = useStatsDataStore();

        if (statsStore.statsDataAvailable) {
          next();
        } else {
          // TODO: show a toast or something
          next('/');
        }
      }
    },
  ],
});

export default router;
