import { IDonation } from './IDonation';
import buyMeACoffee from '@/assets/buy-me-a-coffee.png';

export const donations: IDonation[] = [
  {
     id: `how`,
      title: `How can you support me?`,
      text: `There are many ways to support! For example:`,
      list: [
        `Like, Share and Rate the extension.`,
        `Follow me and "Star" the project on GitHub.`,
        `Follow me on Twitter, LinkedIn, Facebook, YouTube, etc...`,
        `Like, share and comment on my posts/videos.`
      ],
      mdiIcon: `heart`,
      image: ``,
      signature: `I appreciate your support!`
  },
  {
    id: `buyMeACoffee`,
    title: `Buy me a coffee`,
    text: `You can motivate me with the price of a coffee! Before donating, please consider the following:`,
    list: [
      `There are no disadvantages or advantages if you donate or not!`,
      `Donations are for appreciation, not for a service!`,
      `I will not provide any service for the donation!`,
      `Only donate if you are sure you can afford it!`
    ],
    mdiIcon: `mdi-coffee`,
    name: `Keresztes Zsolt`,
    identifier: `@kereszteszsolt`,
    image: buyMeACoffee,
    link: {
      text: `Buy me a coffee`,
      url: `https://www.buymeacoffee.com/kereszteszsolt`
    },
    signature: `I appreciate your support!`
  }
];
