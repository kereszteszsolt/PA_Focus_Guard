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
  Websites
} from '@/views/options';
import StatisticsDistractionAttempts from '@/views/options/statistics-views/StatisticsDistractionAttempts.vue';
import StatisticsDataUsage from '@/views/options/statistics-views/StatisticsDataUsage.vue';
import Donations from '@/views/options/footer-views/Donations.vue';
import Privacy from '@/views/options/footer-views/Privacy.vue';
import Contact from '@/views/options/footer-views/Contact.vue';

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/footer-pages/about',
      name: 'About',
      component: About
    },
    {
      path: '/footer-pages/acknowledgments',
      name: 'Acknowledgments',
      component: Acknowledgments
    },
    {
      path: '/focus-message',
      name: 'FocusMessage',
      component: FocusMessage
    },
    {
      path: '/footer-pages/gtc',
      name: 'Gtc',
      component: Gtc
    },
    {
      path: '/footer-pages/how-to-use',
      name: 'HowToUse',
      component: HowToUse
    },
    {
      path: '/footer-pages/donations',
      name: 'Donations',
      component: Donations
    },
    {
      path: '/footer-pages/privacy',
      name: 'Privacy',
      component: Privacy
    },
    {
      path: '/footer-pages/contact',
      name: 'Contact',
      component: Contact
    },
    {
      path: '/languages',
      name: 'Languages',
      component: Language
    },
    {
      path: '/settings',
      name: 'Settings',
      component: Settings
    },
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
      path: '/statistics/distraction-attempts',
      name: 'StatisticsDistractionAttempts',
      component: StatisticsDistractionAttempts
    },
    {
      path: '/statistics/data-usage',
      name: 'StatisticsDataUsage',
      component: StatisticsDataUsage
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
      name: 'NotFound',
      component: NotFound
    }
  ]
});
