import { IAbout } from './IAbout';

export const about : IAbout[] = [
  {
    id: `intro`,
    title: ``,
    text: `Ez a bővítmény segít összpontosítani, amikor valami fontos dologra szeretnél koncentrálni.
           Kérlek, látogass el a GY.I.K oldalra a működésével kapcsolatos további információkért. `
  },
  {
    id: `goodToKnow`,
    title: `Jó tudni:`,
    list: [
      `Kapcsolattartásért vagy nyomon követésért látogass el a bővítmény "Kapcsolat" oldalára.`,
      `A forráskódot a mellékelt GitHub linken tekintheted meg és játszhatsz vele.`,
      `A legfrissebb elérhetőségi e-mail a Chrome áruház Focus Guard bővítményének oldalán található.`]
  },
  {
    id: `signature`,
    signature: `Keresztes Zsolt, Kolozsvár 2026`
  },
  {
    id: `links`,
    title: `Linkek:`,
    links: [
      {
        text: `Chrome Web Store - Focus Guard`,
        url: `https://chromewebstore.google.com/detail/focus-guard/bdfnblnbjckkhknignkpmckeelfplill`
      },
      {
        text: `GitHub - Focus Guard`,
        url: `https://github.com/kereszteszsolt/PA_Focus_Guard`
      },
      {
        text: `Személyes weboldal - Keresztes Zsolt`,
        url: `https://kereszteszsolt.hu/`
      }]
  },
  {
    id: `signature`,
    signature: `Keresztes Zsolt, Cluj-Napoca 2026`
  }
]
