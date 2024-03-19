import { IFaq } from './IFaq';

export const faq: IFaq[] = [
  {
    id: `areThereYouTubeVideosAboutFocusGuard`,
    question: `Vannak YouTube-videók a „Focus Guard”-ról?`,
    answers: [
      `Természetesen vannak; iratkozz fel, és maradj képben a legújabb funkciókról a csatornámon.`
    ],
    links: [
      {
        text: `Keresztes Zsolt - Vlog,Önfejlesztés,Tudomány&Tech`,
        additionalText: `(Magyar)`,
        url: `https://www.youtube.com/@KeresztesZsolt?sub_confirmation=1`
      },
      {
        text: `Keresztes Zsolt - Vlog, Self-Dev, Science&Tech`,
        additionalText: `(Angol)`,
        url: `https://www.youtube.com/@KeresztesZsolti?sub_confirmation=1`
      }
    ]
  },
  {
    id: `whatIsAWebsiteRule`,
    question: `Mi az a weboldal szabály?`,
    answers: [
      `Valójában egy szűrőszabály, amelyet hozzáadhat az egyik listához.`,
      `Egy szűrőszabályon belül a következő kötelező típusok közül választhat: „Domain”, „Url”, „Sub-Domain” és „Keyword”, valamint választható státuszok közül: „Ideiglenesen inaktív” vagy „Állandóan aktív”.`
    ]
  },
  {
    id: `whatDoesPermanentlyActiveMean`,
    question: `Mit jelent a „Állandóan aktív” kifejezés?`,
    answers: [
      `Ha egy webhelyszabály „Állandóan aktív”, akkor az adott szűrő attól függetlenül aktív, hogy a „Fókusz munkamenet” (session) vagy a „Fókusz mód” be van-e kapcsolva.`
    ]
  },
  {
    id: `whatDoesTemporarilyInactiveMean`,
    question: `Mit jelent az „Ideiglenesen inaktív” kifejezés?`,
    answers: [
      `Ha egy webhelyszabály „Ideiglenesen inaktív”, akkor nem lesz aktív a „Fókusz munkamenetben” vagy a „Fókusz módban”, amikor be van kapcsolva.`
    ]
  },
  {
    id: `whatDoFilteringTypesMean`,
    question: `Mit jelentenek a szűrési típusok?`,
    answers: [
      `Szűrés "Domain" szerint: itt csak a domain nevet kell szűrni a domain végével, pl.: "example.com", "someting.example.com". A második példából csak a valami rész lesz kiszűrve.`,
      `Szűrés „Url” alapján: itt az elérési útvonal is figyelembe vehető pl.: "https://example.com/somthing". Itt a "example.com" rész nem kerül szűrésre; csak az "example.com/something" kezdetű útvonal kerül szűrésre.`,
      `Szűrés a „domainvégződés” szerint: pl.: ".com", ".org". Ebben az esetben az összes olyan webhelyet kiszűri a rendszer, amelynek ".com" vagy ".org" domain vége van. `,
      `Szűrés „kulcsszó” szerint: Az összes olyan oldal leszűrve lesz, amelyik URL tartalmazza az adott szót vagy szótöredéket. `
    ]
  },
  {
    id: `whatDoDistractionAttemptsMean`,
    question: `Hogyan számolják a figyelemelterelési kísérleteket?`,
    answers: [
      `A „Fókuszálási munkamenet” / „Fókusz mód” alatt a számláló be van kapcsolva, és amikor kikapcsol, visszaáll.
       Az összes korábbi figyelemelterelési kísérletet elmenti a figyelemelterelési kísérlet táblázat, és megjeleníthető és törölhető.`
    ]
  },
  {
    id: `whatIsTheDifferenceBetweenFocusModeAndFocusSession`,
    question: `Mi a különbség a „Fókusz” mód és a „Fókusz munkamenet” (session) között?`,
    answers: [
      `Majdnem ugyanaz a dolog.`,
      `A „Fókusz mód” egy aktív kifejezés, amely arra utal, hogy a Fókusz gomb be van kapcsolva és az aktiválható szabályok aktívak.`,
      `A „Fókusz munkamenet” arra az időszakra utal, amikor a Fókusz mód aktív, vagy a múltban aktív volt.`
    ]
  },
  {
    id: `besidesYouTubeHowCanIGetInformationAboutTheLatestFeatures`,
    question: `A YouTube-on kívül hogyan kaphatok információt a legújabb funkciókról?`,
    answers: [
      `Amikor egy újdonság megjelenik, a következő platformokon teszem közzé: LinkedIn, Twitter és Facebook.`,
      `Kövess engem, és figyeld a legújabb funkciókat a bejegyzéseimben.`
    ],
    links: [
      {
        text: `LinkedIn`,
        url: `https://www.linkedin.com/in/kereszteszsolt`,
        additionalText: `Kétnyelvű bejegyzések (Magyar/Angol)`
      },
      {
        text: `Twitter/X`,
        url: `https://twitter.com/KeresztesZsolti`,
        additionalText: `Kétnyelvű bejegyzések (Magyar/Angol)`
      },
      {
        text: `Facebook`,
        url: `https://www.facebook.com/KeresztesZsolt.kzs`,
        additionalText: `Kétnyelvű bejegyzések (Magyar/Angol)`
      }
    ]
  }
];
