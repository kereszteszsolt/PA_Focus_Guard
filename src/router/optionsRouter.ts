import { createRouter, createWebHashHistory } from 'vue-router';
import { Websites, Test } from '@/views/options';

export default createRouter(
    {
      history: createWebHashHistory(),
      routes: [
        {
          path: '/websites',
          name: 'WebsitesDefaultList',
          component: Websites
        },
        {
          path: '/websites/:id',
          name: 'WebsitesByListId',
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
        }]
    }
  );
