import { createContext, useEffect, useState } from 'react';

/* eslint-disable-next-line react-refresh/only-export-components */
export const LanguageContext = createContext();

const getInitialLanguage = () => {
  const savedLanguage = localStorage.getItem('preferredLang');
  if (savedLanguage === 'pt' || savedLanguage === 'en') return savedLanguage;
  return navigator.language.toLowerCase().startsWith('pt') ? 'pt' : 'en';
};

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(getInitialLanguage);

  useEffect(() => {
    localStorage.setItem('preferredLang', lang);
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}
