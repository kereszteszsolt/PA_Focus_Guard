import { createRouter, createWebHashHistory, createWebHistory, Router } from 'vue-router';
import Home from '../views/options/Home.vue';
import Test from '../views/options/Test.vue';

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
