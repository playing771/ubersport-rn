export const fallback = 'en';

export const supportedLocales: { [locale: string]: any } = {
  en: {
    name: 'English',
    translationFileLoader: () => require('../lang/en.json'),

    // en is default locale in Moment
    momentLocaleLoader: () => Promise.resolve()
  }
  // ar: {
  //   name: 'عربي',
  //   translationFileLoader: () => require('../lang/ar.json'),
  //   momentLocaleLoader: () => import()
  // }
};

export const defaultNamespace = 'common';

export const namespaces = [
  'common',
  'lists',
  'ListScreen',
  'ListOfTodos',
  'AddTodoScreen',
  'DatePickerAndroid'
];
