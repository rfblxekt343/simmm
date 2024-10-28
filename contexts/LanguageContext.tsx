"use client";

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

type Language = 'en' | 'he' | 'ar' | 'ru';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');
  const searchParams = useSearchParams();

  useEffect(() => {
    const langParam = searchParams?.get('lang') as Language;
    if (langParam && ['en', 'he', 'ar', 'ru'].includes(langParam)) {
      setLanguage(langParam);
    }
  }, [searchParams]);

  const isRTL = language === 'he' || language === 'ar';

  useEffect(() => {
    console.log('Language changed:', language);
    console.log('Is RTL:', isRTL);
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language, isRTL]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
