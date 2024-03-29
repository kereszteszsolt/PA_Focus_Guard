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
import * as constants from '@/constants';

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/footer-pages/about',
      name: constants.routeName.ABOUT,
      component: About
    },
    {
      path: '/footer-pages/acknowledgments',
      name: constants.routeName.ACKNOWLEDGMENTS,
      component: Acknowledgments
    },
    {
      path: '/focus-message',
      name: 'FocusMessage',
      component: FocusMessage
    },
    {
      path: '/footer-pages/gtc',
      name: constants.routeName.GTC,
      component: Gtc
    },
    {
      path: '/footer-pages/how-to-use',
      name: constants.routeName.HOW_TO_USE,
      component: HowToUse
    },
    {
      path: '/footer-pages/donations',
      name: constants.routeName.DONATIONS,
      component: Donations
    },
    {
      path: '/footer-pages/privacy',
      name: constants.routeName.PRIVACY,
      component: Privacy
    },
    {
      path: '/footer-pages/contact',
      name: constants.routeName.CONTACT,
      component: Contact
    },
    {
      path: '/languages',
      name: 'Languages',
      component: Language
    },
    {
      path: '/settings/settings',
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
