'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import LanguageSelector from './LanguageSelector';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../utils/translations';
import { FaBars, FaTimes } from 'react-icons/fa';
import { COMPANY_NAME } from '../utils/constants';

const NavBar: React.FC = () => {
  const { language, isRTL } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const getLangLink = (path: string) => {
    const link = path === '/' ? `/?lang=${language}` : `${path}?lang=${language}`;
    console.log(`Generated link for path "${path}": ${link}`);
    return link;
  };

  console.log('Current language:', language);
  console.log('Is RTL:', isRTL);

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Image src="/globe-icon.svg" alt="Globe Icon" width={30} height={30} className={`${isRTL ? 'ml-3' : 'mr-3'} inline-block`} />
            <Link href={getLangLink("/")} className="text-2xl font-bold text-[#2563EB] inline-block">{COMPANY_NAME}</Link>
          </div>
          <div className="hidden md:flex items-center">
            <Link href={getLangLink("/")} className="text-gray-600 hover:text-primary-600 px-2" onClick={() => console.log('Home link clicked')}>{translations[language].home}</Link>
            <Link href={getLangLink("/compare-plans")} className="text-gray-600 hover:text-primary-600 px-2" onClick={() => console.log('Compare Plans link clicked')}>{translations[language].comparePlans}</Link>
            {/*<Link href={getLangLink("/about")} className="text-gray-600 hover:text-primary-600 px-2" onClick={() => console.log('About link clicked')}>{translations[language].about}</Link>*/}
            {/*<Link href={getLangLink("/contact")} className="text-gray-600 hover:text-primary-600 px-2" onClick={() => console.log('Contact link clicked')}>{translations[language].contact}</Link>*/}
            <LanguageSelector />
          </div>
          <div className="md:hidden flex items-center justify-center space-x-4">
            <LanguageSelector />
            <button onClick={toggleMenu} className="text-gray-600 hover:text-primary-600 p-2">
              {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
        {isMenuOpen && (
          <div className="mt-4 md:hidden">
            <Link href={getLangLink("/")} className="block text-gray-600 hover:text-primary-600 py-2" onClick={() => console.log('Mobile Home link clicked')}>{translations[language].home}</Link>
            <Link href={getLangLink("/compare-plans")} className="block text-gray-600 hover:text-primary-600 py-2" onClick={() => console.log('Mobile Compare Plans link clicked')}>{translations[language].comparePlans}</Link>
            {/*<Link href={getLangLink("/about")} className="block text-gray-600 hover:text-primary-600 py-2" onClick={() => console.log('Mobile About link clicked')}>{translations[language].about}</Link>*/}
            {/*<Link href={getLangLink("/contact")} className="block text-gray-600 hover:text-primary-600 py-2" onClick={() => console.log('Mobile Contact link clicked')}>{translations[language].contact}</Link>*/}
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
