import { createRouter, createWebHashHistory } from 'vue-router';
import { Websites, Test } from '@/views/options';
import FocusMessage from '@/views/options/FocusMessage.vue';

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
          path: '/focus-message',
          name: 'FocusMessage',
          component: FocusMessage
        },
        {
          path: '/focus-message/:id',
          name: 'FocusMessageById',
          component: FocusMessage
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
