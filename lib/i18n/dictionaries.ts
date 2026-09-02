import th from './locales/th.json';
import en from './locales/en.json';

const dictionaries = {
  th,
  en,
};

export type Locale = keyof typeof dictionaries;
export type Dictionary = typeof th;

export const getDictionary = async (locale: Locale): Promise<Dictionary> => {
  return dictionaries[locale] || dictionaries.th;
};
