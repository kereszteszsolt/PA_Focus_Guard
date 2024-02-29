import { createRouter, createWebHashHistory } from 'vue-router';
import {
  About,
  Acknowledgments,
  FocusMessage,
  Gtc,
  HowToUse,
  Language,
  NotFound,
  Settings,
  Test,
  Websites,
} from '@/views/options';

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/about',
      name: 'About',
      component: About,
    },
    {
      path: '/acknowledgments',
      name: 'Acknowledgments',
      component: Acknowledgments,
    },
    {
      path: '/focus-message',
      name: 'FocusMessage',
      component: FocusMessage,
    },
    {
      path: '/gtc',
      name: 'Gtc',
      component: Gtc,
    },
    {
      path: '/how-to-use',
      name: 'HowToUse',
      component: HowToUse,
    },
    {
      path: '/languages',
      name: 'Languages',
      component: Language,
    },
    {
      path: '/settings',
      name: 'Settings',
      component: Settings,
    },
    {
      path: '/websites',
      name: 'WebsitesDefaultList',
      component: Websites,
    },
    {
      path: '/websites/:id',
      name: 'WebsitesByListId',
      component: Websites,
    },
    {
      path: '/test',
      name: 'Test',
      component: Test,
    },
    {
      path: '/',
      redirect: '/websites',
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFound,
    },
  ],
});
