import leoProfanity from 'leo-profanity';

leoProfanity.loadDictionary('en');
leoProfanity.loadDictionary('ru');

const combinedDictionary = leoProfanity.getDictionary('en').concat(leoProfanity.getDictionary('ru'));
leoProfanity.add(combinedDictionary);

export default leoProfanity;
