import { IFaq } from './IFaq';

export const faq: IFaq[] = [
  {
    id: `areThereYouTubeVideosAboutFocusGuard`,
    question: `Vannak YouTube-videók a „Focus Guard”-ról?`,
    answers: [
      `Természetesen vannak; iratkozz fel a csatornámra, és maradj naprakész a „Focus Guard” legújabb fejlesztéseivel.`
    ],
    links: [
      {
        text: `Keresztes Zsolt - Vlog,Önfejlesztés,Tudomány&Tech`,
        additionalText1: `@kereszteszsolt`,
        additionalText2: `(Magyar)`,
        url: `https://www.youtube.com/@KeresztesZsolt?sub_confirmation=1`,
        mdiIcon: `mdi-youtube`
      },
      {
        text: `Keresztes Zsolt - Vlog, Self-Dev, Science&Tech`,
        additionalText1: `@kereszteszsolti`,
        additionalText2: `(Angol)`,
        url: `https://www.youtube.com/@KeresztesZsolti?sub_confirmation=1`,
        mdiIcon: `mdi-youtube`
      }
    ]
  },
  {
    id: `besidesYouTubeHowCanIGetInformationAboutTheLatestFeatures`,
    question: `A YouTube-on kívül hogyan tájékozódhatok a „Focus Guard” legújabb fejlesztéseiről?`,
    answers: [
      `Amikor a „Focus Guard”-dal kapcsolatban újdonságok jelennek meg, azt a LinkedIn, Twitter és Facebook oldalaimon is közzéteszem.`,
      `Kövess és maradj naprakész a „Focus Guard” legújabb fejlesztéseivel.`
    ],
    links: [
      {
        text: `Keresztes Zsolt`,
        url: `https://www.linkedin.com/in/kereszteszsolt`,
        additionalText1: `@kereszteszsolt`,
        additionalText2: `Kétnyelvű bejegyzések (Magyar/Angol)`,
        mdiIcon: `mdi-linkedin`
      },
      {
        text: `Keresztes Zsolt`,
        url: `https://twitter.com/KeresztesZsolti`,
        additionalText1: `@KeresztesZsolti`,
        additionalText2: `Kétnyelvű bejegyzések (Magyar/Angol)`,
        mdiIcon: `mdi-twitter`
      },
      {
        text: `Keresztes Zsolt`,
        url: `https://www.facebook.com/KeresztesZsolt.kzs`,
        additionalText1: `@KeresztesZsolt.kzs`,
        additionalText2: `Kétnyelvű bejegyzések (Magyar/Angol)`,
        mdiIcon: `mdi-facebook`
      }
    ]
  },
  {
    id: `whatIsAWebsiteRule`,
    question: `Mi az a weboldal szabály?`,
    answers: [
      `Valójában egy szűrőszabály, amelyet hozzáadhatsz az egyik listához.`,
      `Egy szűrőszabályon belül a következő kötelező típusok közül választhatsz: „Domain”, „Url”, „Domain-végződés” és „Kulcsszó”, valamint választható státuszok közül: „Ideiglenesen inaktív” vagy „Állandóan aktív”.`
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
      `Szűrés "Domain" szerint: Itt a szűrés domain nevek szerint működik, mint például "example.com" és "someting.example.com".  A "example.com" esetén az egész "example.com" webhely szűrésre kerül, más hasonló webhelyek azonban nem. A "something.example.com" esetében csak az a webhelymodul kerül szűrésre, amely a something "sub-domain"-t tartalmazza, de az egész "example.com" webhely nem.`,
      `Szűrés „Url” alapján: itt az elérési útvonal is figyelembe vehető pl.: "https://example.com/somthing". Itt a "example.com" rész nem kerül szűrésre; csak az "example.com/something" kezdetű útvonal kerül szűrésre.`,
      `Szűrés a „domainvégződés” szerint: pl.: ".com", ".org". Ebben az esetben az összes olyan webhelyet kiszűri a rendszer, amelynek ".com" vagy ".org" domain vége van. `,
      `Szűrés „kulcsszó” szerint: Az összes olyan oldal szűrve lesz, amely URL tartalmazza az adott szót vagy szótöredéket. `
    ]
  },
  {
    id: `whatDoDistractionAttemptsMean`,
    question: `Hogyan számolják a szórakozási kísérleteket?`,
    answers: [
      `A „Fókuszálási munkamenet” / „Fókusz mód” alatt a számláló be van kapcsolva, és amikor kikapcsol, visszaáll.
       Az összes korábbi szórakozási kísérletet elmenti a szórakozási kísérlet táblázat, ami megjeleníthető és törölhető.`
    ]
  },
  {
    id: `whatIsTheDifferenceBetweenFocusModeAndFocusSession`,
    question: `Mi a különbség a „Fókusz mód” és a „Fókusz munkamenet” (session) között?`,
    answers: [
      `Majdnem ugyanaz a dolog.`,
      `A „Fókusz mód aktív” kifejezés arra utal, hogy a Fókusz gomb be van kapcsolva és az aktiválható szabályok aktívak.`,
      `A „Fókusz munkamenet” arra az időszakra utal, amikor a Fókusz mód aktív, vagy a múltban aktív volt.`
    ]
  }
];
