import { IDonation } from './IDonation';
import buyMeACoffee from '@/assets/buy-me-a-coffee.png';
export const donations: IDonation[] = [
  {
    id: `how`,
    title: `Hogyan tudsz támogatni engem?`,
    text: `Sokféleképpen lehet támogatni! Például:`,
    list: [
      `Lájkold, oszd meg és értékeld a bővítmény.t`,
      `Kövess és "csillagozd" a projektet a GitHub-on.`,
      `Kövess engem a Twitteren, LinkedIn-en, Facebookon, YouTube-on, stb...`,
      `Lájkold, oszd meg és kommentáld a bejegyzéseimet/videóimat.`
    ],
    mdiIcon: `heart`,
    image: ``,
    signature: `Nagyra értékelem a támogatásodat!`
  },
  {
    id: `buyMeACoffee`,
    title: `Buy me a coffee`,
    text: `Ha tetszik a munkám, most egy kávé árával is kifejezheted az elismerésedet! Mielőtt adományoznál, kérlek, vedd figyelembe a következőket:`,
    list: [
      `Nincsenek hátrányok vagy előnyök, ha adományozol vagy sem!`,
      `Az adományok az elismerés kifejezésére szolgálnak!`,
      `Nem nyújtok semmilyen szolgáltatást az adományért cserébe!`,
      `Csak akkor adományozz, ha biztos vagy benne, hogy megengedheted magadnak!`
    ],
    mdiIcon: `mdi-coffee`,
    name: `Keresztes Zsolt`,
    identifier: `@kereszteszsolt`,
    image: buyMeACoffee,
    link: {
      text: `Buy me a coffee`,
      url: `https://www.buymeacoffee.com/kereszteszsolt`
    },
    signature: `Nagyra értékelem a támogatásodat!`
  }
];
