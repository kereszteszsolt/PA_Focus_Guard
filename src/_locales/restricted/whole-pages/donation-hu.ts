import { IDonation } from './IDonation';
import buyMeACoffee from '@/assets/buy-me-a-coffee.png';
export const donations: IDonation[] = [
  {
    id: `how`,
    title: `Hogyan tudsz támogatni engem?`,
    text: `Sokféleképpen lehet támogatni! Például:`,
    list: [
      `Likok, Megosztás, Bővítményt értékelése`,
      `Kövesd és csillagozd a projektet a GitHubon`,
      `Kövess engem a Twitteren, LinkedIn-en, GitHub-on, Facebookon, YouTube-on (Hu), YouTube-on (En), stb....`,
      `Lájkold, oszd meg és kommentáld a bejegyzéseimet/videóimat`
    ],
    mdiIcon: `heart`,
    image: ``,
    signature: `Nagyra értékelem a támogatásodat!`
  },
  {
    id: `buyMeACoffee`,
    title: `Buy me a coffee`,
    text: `Egy kávé árával is motiválhatsz engem! Mielőtt adományozol, kérlek, vedd figyelembe a következőket:`,
    list: [
      `Nincsenek hátrányok vagy előnyök, ha adományozol vagy sem!`,
      `Az adományozás elismerés, nem pedig szolgáltatás!`,
      `Nem nyújtok semmilyen szolgáltatást az adományért cserébe!`,
      `Csak akkor adományozz, ha biztos vagy benne és megengedheted magadnak!`
    ],
    mdiIcon: `mdi-coffee`,
    image: buyMeACoffee,
    link: {
      text: `Buy me a coffee`,
      url: `https://www.buymeacoffee.com/kereszteszsolt`
    },
    signature: `Nagyra értékelem a támogatásodat!`
  }
];
