import { createRouter, createWebHashHistory } from 'vue-router';
import { Websites, Test } from '@/views/options';

export default createRouter(
    {
      history: createWebHashHistory(),
      routes: [
        {
          path: '/websites',
          name: 'Websites',
          component: Websites
        },
        {
          path: '/test',
          name: 'Test',
          component: Test
        },
        {
          path: '/',
          redirect: '/websites'
        },
        {
          path: '/:pathMatch(.*)*',
          redirect: '/websites'
        }]
    }
  );
