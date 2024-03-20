import { c as r_msg } from '@/_locales/restricted';
import { ISocialMediaLink } from '@/interfaces';
import buyMeACoffee from '@/assets/buy-me-a-coffee.png';

export const socialMediaLinks: ISocialMediaLink[] = [
  {
    id: 1,
    platformName: 'Facebook',
    mdiIcon: 'mdi-facebook',
    url: 'https://www.facebook.com/@KeresztesZsolt.kzs',
    profileName: 'Keresztes Zsolt',
    profileIdentifier: '@KeresztesZsolt.kzs',
    shortDescription: r_msg.SOC_MED_DESC_FACEBOOK,
    callToAction: r_msg.CLICK_AND_FALLOW_ME_ON_FACEBOOK,
    contactOrder: 1,
    footerOrder: 1
  },
  {
    id: 2,
    platformName: 'LinkedIn',
    mdiIcon: 'mdi-linkedin',
    url: 'https://www.linkedin.com/in/keresztes.zsolt',
    profileName: 'Keresztes Zsolt',
    profileIdentifier: '@keresztes.zsolt',
    shortDescription: r_msg.SOC_MED_DESC_LINKEDIN,
    callToAction: r_msg.CLICK_AND_FALLOW_ME_ON_LINKEDIN,
    contactOrder: 2,
    footerOrder: 2
  },
  {
    id: 3,
    platformName: 'GitHub',
    mdiIcon: 'mdi-github',
    url: 'https://www.github.com/kereszteszsolt',
    profileName: 'Keresztes Zsolt',
    profileIdentifier: '@kereszteszsolt',
    shortDescription: r_msg.SOC_MED_DESC_GITHUB,
    callToAction: r_msg.CLICK_AND_FALLOW_ME_ON_GITHUB,
    contactOrder: 3,
    footerOrder: 7
  },
  {
    id: 4,
    platformName: 'Twitter',
    mdiIcon: 'mdi-twitter',
    url: 'https://www.twitter.com/kereszteszsolti',
    profileName: 'Keresztes Zsolt',
    profileIdentifier: '@KeresztesZsolti',
    shortDescription: r_msg.SOC_MED_DESC_TWITTER,
    callToAction: r_msg.CLICK_AND_FALLOW_ME_ON_TWITTER,
    contactOrder: 4,
    footerOrder: 3
  },
  {
    id: 5,
    platformName: 'Instagram',
    mdiIcon: 'mdi-instagram',
    url: 'https://www.instagram.com/kereszteszsolt_zsk',
    profileName: 'Keresztes Zsolt',
    profileIdentifier: '@kereszteszsolt_zsk',
    shortDescription: r_msg.SOC_MED_DESC_INSTAGRAM,
    callToAction: r_msg.CLICK_AND_FALLOW_ME_ON_INSTAGRAM,
    contactOrder: 5,
    footerOrder: 9
  },
  {
    id: 6,
    platformName: 'YouTube-Hu',
    mdiIcon: 'mdi-youtube',
    url: 'https://www.youtube.com/channel/@kereszteszsolt',
    profileName: 'Keresztes Zsolt - Vlog,Önfejlesztés,Tudomány&Tech',
    profileIdentifier: '@kereszteszsolt',
    shortDescription: r_msg.SOC_MED_DESC_YOUTUBE_HU,
    callToAction: r_msg.CLICK_AND_FALLOW_ME_ON_YOUTUBE,
    contactOrder: 6,
    footerOrder: 6
  },
  {
    id: 7,
    platformName: 'YouTube-En',
    mdiIcon: 'mdi-youtube',
    url: 'https://www.youtube.com/channel/@kereszteszsolti',
    profileName: 'Keresztes Zsolt - Vlog, Self-Dev, Science&Tech',
    profileIdentifier: '@kereszteszsolti',
    shortDescription: r_msg.SOC_MED_DESC_YOUTUBE_EN,
    callToAction: r_msg.CLICK_AND_FALLOW_ME_ON_YOUTUBE,
    contactOrder: 7,
    footerOrder: 4
  },
  {
    id: 8,
    platformName: 'Linktr.ee',
    mdiIcon: 'mdi-palm-tree',
    url: 'https://www.linktr.ee/kereszteszsolt',
    profileName: 'Keresztes Zsolt',
    profileIdentifier: '@kereszteszsolt',
    shortDescription: r_msg.SOC_MED_DESC_LINK_TREE,
    callToAction: r_msg.CLICK_AND_CHECK_MY_LINK_TREE_PAGE,
    contactOrder: 8,
    footerOrder: 8
  },
  {
    id: 9,
    platformName: 'buy-me-a-coffee',
    mdiIcon: 'mdi-coffee',
    url: 'https://www.buymeacoffee.com/kereszteszsolt',
    profileName: 'Keresztes Zsolt',
    profileIdentifier: '@kereszteszsolt',
    shortDescription: r_msg.SOC_MED_DESC_BUY_ME_A_COFFEE,
    callToAction: r_msg.CTA_BUY_ME_A_COFFEE,
    list: [
      r_msg.CTA_BUY_ME_A_COFFEE_L1,
      r_msg.CTA_BUY_ME_A_COFFEE_L2,
      r_msg.CTA_BUY_ME_A_COFFEE_L3,
      r_msg.CTA_BUY_ME_A_COFFEE_L4
    ],
    image: buyMeACoffee,
    contactOrder: 9,
    footerOrder: 5
  },
  {
    id: 10,
    platformName: 'email',
    mdiIcon: 'mdi-at',
    url: 'https://chromewebstore.google.com/detail/focus-guard/bdfnblnbjckkhknignkpmckeelfplill',
    profileName: '',
    profileIdentifier: '',
    shortDescription: 'You can find the actualized contact e-mail on the Focus Guard extension page on the Chrome web store!',
    callToAction: '',
    contactOrder: 10,
    footerOrder: -1,
  }
];
