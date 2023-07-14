import * as constants from '../constants';

export const facebook = [
    {
        name: 'Facebook - Reels',
        searchTerms: ['Reels and short videos', 'Reel-videók és rövid videók', 'Reel-uri şi videoclipuri scurte',
            'Reels und kurzvideos', 'Reels y videos cortos', 'Reels et vidéos courtes'],
        customSearchTerms: [],
        elementName: constants.facebookActionNames.FACEBOOK_REELS,
        action: 'remove',
        activeRule: true,
        permanently: false
    },
    {
        name: 'Facebook - Stories',
        searchTerms: ['Stories', 'Történetek', 'Povestea ta', 'Deine Story', 'Tu historia', 'Votre Story'],
        customSearchTerms: [],
        elementName: constants.facebookActionNames.FACEBOOK_STORIES,
        action: 'remove',
        activeRule: true,
        permanently: false
    },
    {
        name: 'Facebook - People You May Know',
        searchTerms: ['People You May Know', 'Kit ismerhetek?'],
        customSearchTerms: [],
        elementName: constants.facebookActionNames.FACEBOOK_PEOPLE_YOU_MAY_KNOW,
        action: 'remove',
        activeRule: true,
        permanently: false
    },
    {
        name: 'Facebook - Sponsored',
        searchTerms: ['Sponsored', 'Hirdetés', 'Sponsorizat', 'Anzeige', 'Publicidad', 'Sponsorisé'],
        customSearchTerms: [],
        elementName: constants.facebookActionNames.FACEBOOK_SPONSORED,
        activeRule: false,
        permanently: false
    }
];
