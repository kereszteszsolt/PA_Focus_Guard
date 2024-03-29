import * as constants from '@/constants';
import { c as r_msg } from '@/_locales/restricted';

export const footerViewLinks = [
  {
    id: 1,
    title: r_msg.PRIVACY_POLICY,
    url: '/footer-pages/privacy',
    routeName: constants.routeName.PRIVACY
  },
  {
    id: 2,
    title: r_msg.GTC,
    url: '/footer-pages/gtc',
    routeName: constants.routeName.GTC
  },
  {
    id: 3,
    title: r_msg.ACKNOWLEDGMENTS,
    url: '/footer-pages/acknowledgments',
    routeName: constants.routeName.ACKNOWLEDGMENTS
  },
  {
    id: 4,
    title: r_msg.DONATIONS,
    url: '/footer-pages/donations',
    routeName: constants.routeName.DONATIONS
  },
  {
    id: 5,
    title: r_msg.QNA,
    url: '/footer-pages/how-to-use',
    routeName: constants.routeName.HOW_TO_USE
  },
  {
    id: 6,
    title: r_msg.CONTACT,
    url: '/footer-pages/contact',
    routeName: constants.routeName.CONTACT
  },
  {
    id: 7,
    title: r_msg.ABOUT,
    url: '/footer-pages/about',
    routeName: constants.routeName.ABOUT
  }
];
