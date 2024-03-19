import { IFaq } from './IFaq';

export const faq: IFaq[] = [
  {
    id: `areThereYouTubeVideosAboutFocusGuard`,
    question: `Are there YouTube videos about "Focus Guard"?`,
    answers: [
      `Of course, they are; subscribe and stay tuned to the latest features on my channel.`
    ],
    links: [
      {
        text: `Keresztes Zsolt - Vlog,Önfejlesztés,Tudomány&Tech`,
        additionalText: `(Hungarian)`,
        url: `https://www.youtube.com/@KeresztesZsolt?sub_confirmation=1`
      },
      {
        text: `Keresztes Zsolt - Vlog, Self-Dev, Science&Tech`,
        additionalText: `(English)`,
        url: `https://www.youtube.com/@KeresztesZsolti?sub_confirmation=1`
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
      `Filter by  "Domain": here will be considered filtering only the domain name with his domain end ex: "example.com",  "someting.example.com". From the second example, only the something part will be filtered out.`,
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
  },
  {
    id: `besidesYouTubeHowCanIGetInformationAboutTheLatestFeatures`,
    question: `Besides YouTube, how can I get information about the latest features?`,
    answers: [
      `When a feature comes out,  I post it on the following platforms: LinkedIn, Twitter, and Facebook.`,
      `Follow me, and stay tuned to the latest features on my posts.`
    ],
    links: [
      {
        text: `LinkedIn`,
        url: `https://www.linkedin.com/in/kereszteszsolt`,
        additionalText: `Bilingual Posts (Hungarian/English)`
      },
      {
        text: `Twitter/X`,
        url: `https://twitter.com/KeresztesZsolti`,
        additionalText: `Bilingual Posts (Hungarian/English)`
      },
      {
        text: `Facebook`,
        url: `https://www.facebook.com/KeresztesZsolt.kzs`,
        additionalText: `Bilingual Posts (Hungarian/English)`
      }
    ]
  }
];
