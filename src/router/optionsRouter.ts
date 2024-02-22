import { createRouter, createWebHashHistory } from 'vue-router';
import { Websites, Test } from '@/views/options';
import FocusMessage from '@/views/options/FocusMessage.vue';
import Language from '@/views/options/Language.vue';

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
          path: '/languages',
          name: 'Languages',
          component: Language
        },
        {
          path: '/languages/:id',
          name: 'LanguagesByLanguageId',
          component: Language
        },
        {
          path: '/focus-message',
          name: 'FocusMessage',
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
