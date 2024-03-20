import { IAbout } from './IAbout';

export const about: IAbout[] = [
  {
    id: `intro`,
    title: ``,
    text: `This extension helps you stay focused when you want to focus on something important.
           Please visit the Q&A page for more info about how it works. `
  },
  {
    id: `list`,
    title: `Good to know:`,
    list: [
      `For contacts or follow-up, visit this extension's "Contact" page.`,
      `You can see and play with the source code at the attached GitHub link.`,
      `The most current contact e-mail is on the Chrome store Focus Guard extension page. `]
  },
  {
    id: `links`,
    title: `Links`,
    links: [
      {
        text: `Chrome Web Store - Focus Guard`,
        url: `https://chromewebstore.google.com/detail/focus-guard/bdfnblnbjckkhknignkpmckeelfplill`
      },
      {
        text: `GitHub - Focus Guard`,
        url: `https://github.com/kereszteszsolt/PA_Focus_Guard`
      }]
  },
  {
    id: `signature`,
    signature: `Keresztes Zsolt, Cluj-Napoca 2024`
  }
];
