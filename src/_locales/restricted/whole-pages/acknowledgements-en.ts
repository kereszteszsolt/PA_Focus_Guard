import { IAcknowledgement } from './IAcknowledgement';
import focus from '@/assets/focus.jpg';

export const acknowledgements: IAcknowledgement[] = [
  {
    id: `supportAndEncouragement`,
    title: `Support and Encouragement`,
    text: ` I would also like to express my gratitude to all the individuals who supported and encouraged me throughout the development process of the Focus Guard extension.`,
  },
  {
    id: `stockPhotos`,
    title: `Stock Photos`,
    text: `Thanks to @Homegrounds from Pixabay for providing the stock photo used in the Focus Guard extension.`,
    textAllImg: `The photo that I used in the Focus Guard extension:`,
    images: [
      {
        src:  focus,
        alt: `Focus, Inspire, Inspiration image`
      },
    ],
    links: [
      {
        text: `Homegrounds`,
        url: `https://pixabay.com/users/homegrounds-18055885/`
      },
      {
        text: `Pixabay`,
        url: `https://pixabay.com/`
      },
      {
        text: `Focus, Inspire, Inspiration`,
        url: `https://pixabay.com/photos/focus-inspire-inspiration-5519780/`
      }
    ]
  }
];
