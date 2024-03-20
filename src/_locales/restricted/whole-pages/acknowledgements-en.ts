import { IAcknowledgement } from './IAcknowledgement';

export const acknowledgements: IAcknowledgement[] = [
  {
    id: `stockPhotos`,
    title: `Stock Photos`,
    text: `Tanks to @Homegrounds from Pixabay for the stock photos used in the Focus Guard extension.`,
    textAllImg: `The following stock photos were used in the Focus Guard extension:`,
    images: [
      {
        src: `https://cdn.pixabay.com/photo/2020/08/26/15/24/focus-5519780_1280.jpg`,
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
        url: `https://pixabay.com/ro/photos/focalizare-a-inspira-inspira%C8%9Bie-5519780/`
      }
    ]
  },
  {
    id: `supportAndEncouragement`,
    title: `Support and Encouragement`,
    text: `Thanks to all persons who supported and encouraged me during the development of the Focus Guard extension!`,
  }
];
