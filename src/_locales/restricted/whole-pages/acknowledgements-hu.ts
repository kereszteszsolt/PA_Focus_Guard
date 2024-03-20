import { IAcknowledgement } from './IAcknowledgement';
import focus from '@/assets/focus.jpg';

export const acknowledgements: IAcknowledgement[] = [
  {
    id: `stockPhotos`,
    title: `Stock Photos`,
    text: `Köszönet a @Homegroundsnak a Pixabay-ről a „Focus Guard” bővítményben használt stock fotóért.`,
    textAllImg: `A fotó, amelyet a „Focus Guard” bővítményben használtam:`,
    images: [
      {
        src: focus,
        alt: `Fókusz, Inspirálja, Ihlet kép.`
      },
    ],
    links: [
      {
        text: `Homegrounds`,
        url: `https://pixabay.com/hu/users/homegrounds-18055885/`
      },
      {
        text: `Pixabay`,
        url: `https://pixabay.com`
      },
      {
        text: `Fókusz, Inspirálja, Ihlet kép.`,
        url: `https://pixabay.com/hu/photos/f%C3%B3kusz-inspir%C3%A1lja-ihlet-5519780/`
      }
    ]
  },
  {
    id: `supportAndEncouragement`,
    title: `Támogatás és bátorítás`,
    text: `Szeretném továbbá köszönetemet kifejezni mindazoknak, akik támogattak és bátorítottak a „Focus Guard” bővítmény fejlesztési folyamata során.`,
  }
];
