import { IFaq } from './IFaq';

export const faq: IFaq[] = [
  {
    id: `areThereYouTubeVideosAboutFocusGuard`,
    question: `Are there YouTube videos about "Focus Guard"?`,
    answers: [
      `Of course, they are; subscribe to my channel and stay up-to-date with the latest features of "Focus Guard".`
    ],
    links: [
      {
        text: `Keresztes Zsolt - Vlog,Önfejlesztés,Tudomány&Tech`,
        additionalText1: `@kereszteszsolt`,
        additionalText2: `(Hungarian)`,
        url: `https://www.youtube.com/@KeresztesZsolt?sub_confirmation=1`,
        mdiIcon: `mdi-youtube`
      },
      {
        text: `Keresztes Zsolt - Vlog, Self-Dev, Science&Tech`,
        additionalText1: `@kereszteszsolti`,
        additionalText2: `(English)`,
        url: `https://www.youtube.com/@KeresztesZsolti?sub_confirmation=1`,
        mdiIcon: `mdi-youtube`
      }
    ]
  },
  {
    id: `besidesYouTubeHowCanIGetInformationAboutTheLatestFeatures`,
    question: `Besides YouTube, how can I get information about the latest features of "Focus Guard"?`,
    answers: [
      `When a feature related to "Focus Guard" comes out, I also post it on LinkedIn, Twitter, and Facebook.`,
      `Follow me and stay up-to-date with the latest features of "Focus Guard".`
    ],
    links: [
      {
        text: `Keresztes Zsolt`,
        url: `https://www.linkedin.com/in/kereszteszsolt`,
        additionalText1: `@kereszteszsolt`,
        additionalText2: `Bilingual Posts (Hungarian/English)`,
        mdiIcon: `mdi-linkedin`
      },
      {
        text: `Keresztes Zsolt`,
        url: `https://twitter.com/KeresztesZsolti`,
        additionalText1: `@KeresztesZsolti`,
        additionalText2: `Bilingual Posts (Hungarian/English)`,
        mdiIcon: `mdi-twitter`
      },
      {
        text: `Keresztes Zsolt`,
        url: `https://www.facebook.com/KeresztesZsolt.kzs`,
        additionalText1: `@KeresztesZsolt.kzs`,
        additionalText2: `Bilingual Posts (Hungarian/English)`,
        mdiIcon: `mdi-facebook`
      }
    ]
  },
  {
    id: `whatIsAWebsiteRule`,
    question: `What is a website rule?`,
    answers: [
      `It is actually a filter rule that you can add to one of the lists.`,
      `Inside a filter rule, you can choose one of the following  mandatory types: "Domain", "Url", "Sub-Domain", and "Keyword", and optional statuses  from: "Temporarily inactive" or "Permanently active."`
    ]
  },
  {
    id: `whatDoesPermanentlyActiveMean`,
    question: `What does "Permanently active" mean?`,
    answers: [
      `If a website rule is "Permanently active," that filter is active independently if a "Focus session" or "Focus mode" is on.`
    ]
  },
  {
    id: `whatDoesTemporarilyInactiveMean`,
    question: `What does "Temporarily inactive" mean?`,
    answers: [
      `If a website rule is "temporarily inactive," it will not be active in "Focus session" or "Focus mode" when it is on.`
    ]
  },
  {
    id: `whatDoFilteringTypesMean`,
    question: `What do filtering types mean?`,
    answers: [
      `Filter by "Domain": Here, the filtering works by domain names like "example.com" and "someting.example.com."  In "example.com," the whole "example.com" website will be filtered out, but not other similar sites. In the case of "something.example.com," only the website module, which contains the something "sub-domain", will be filtered out, but not the whole "example.com" website.`,
      `Filter by "Url": here will be considered also the path ex: "https://example.com/somthing". Here, the "example.com" part will not be filtered; only the path that starts with "example.com/something" will be filtered.`,
      `Filter by "end-domain": ex: ".com", ".org" In this case, all sites with ".com" or ".org" domain ends will be filtered out. `,
      `Filter by "keyword": Be careful here; all sites will be filtered to which URL contains that specific word or fragment of the word. `
    ]
  },
  {
    id: `whatDoDistractionAttemptsMean`,
    question: `What do distraction attempts mean?`,
    answers: [
      `A distraction attempt is trying to access a ruled-out website during a focus session or when rules were set to be permanently active.`
    ]
  },
  {
    id: `How are distraction attempts counted?`,
    question: `How are distraction attempts counted?`,
    answers: [
      `During a "Focus Session" / "Focus Mode", the counter is on and reset when off.
       All past distraction attempts are saved in the distraction attempt table and can be visualized and erased.`
    ]
  },
  {
    id: `whatIsTheDifferenceBetweenFocusModeAndFocusSession`,
    question: `What is the difference between "Focus Mode" and "Focus Session"?`,
    answers: [
      `There are almost the same thing.`,
      `"Focus Mode" is an active term that refers to the fact that the Focus Button is on and the activable rules are active.`,
      `"Focus Session" refers to the period when the Focus mode is active or was active in the past.`
    ]
  }
];
