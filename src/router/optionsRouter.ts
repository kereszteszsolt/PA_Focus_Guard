import { createRouter, createWebHashHistory, createWebHistory, Router } from 'vue-router';
import { Home, Test } from '@/views/options';

export default createRouter(
    {
      history: createWebHashHistory(),
      routes: [
        {
          path: '/home',
          name: 'Options',
          component: Home
        },
        {
          path: '/test',
          name: 'Test',
          component: Test
        },
        {
          path: '/',
          redirect: '/home'
        },
        {
          path: '/:pathMatch(.*)*',
          redirect: '/home'
        }]
    }
  );
