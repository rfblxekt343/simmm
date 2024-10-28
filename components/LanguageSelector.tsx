import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useRouter, usePathname } from 'next/navigation';
import { FaChevronDown } from 'react-icons/fa';

const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'he', name: 'עברית', flag: '🇮🇱' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
];

const LanguageSelector: React.FC = () => {
  const { language, setLanguage, isRTL } = useLanguage();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const handleLanguageChange = (newLang: string) => {
    setLanguage(newLang as 'en' | 'he' | 'ar' | 'ru');
    setIsOpen(false);
    
    // Update the URL with the new language
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set('lang', newLang);
    const newPath = pathname === '/' ? '' : pathname;
    router.push(`${newPath}?${searchParams.toString()}`);
  };

  const currentLanguage = languages.find(lang => lang.code === language);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1 bg-white border border-gray-300 text-gray-700 py-2 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <span className="mr-2">{currentLanguage?.flag}</span>
        <span>{currentLanguage?.name}</span>
        <FaChevronDown className={`text-gray-500 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className={`absolute ${isRTL ? 'left-0' : 'right-0'} mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20`}>
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
            >
              {lang.flag} {lang.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
