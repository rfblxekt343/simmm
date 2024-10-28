import countries from 'i18n-iso-countries';
import en from 'i18n-iso-countries/langs/en.json';
import he from 'i18n-iso-countries/langs/he.json';
import ar from 'i18n-iso-countries/langs/ar.json';
import ru from 'i18n-iso-countries/langs/ru.json';

countries.registerLocale(en);
countries.registerLocale(he);
countries.registerLocale(ar);
countries.registerLocale(ru);

export const getCountryCode = (country: string, language: string): string => {
  const languageMap: { [key: string]: string } = {
    en: 'en',
    he: 'he',
    ar: 'ar',
    ru: 'ru'
  };
  const lang = languageMap[language] || 'en';
  return countries.getAlpha2Code(country, lang) || '';
};

export const getCountryName = (countryCode: string, language: string): string => {
  const languageMap: { [key: string]: string } = {
    en: 'en',
    he: 'he',
    ar: 'ar',
    ru: 'ru'
  };
  const lang = languageMap[language] || 'en';
  return countries.getName(countryCode, lang) || '';
};




