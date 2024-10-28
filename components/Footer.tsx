'use client';

import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../utils/translations';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
import { COMPANY_NAME } from '../utils/constants';

const Footer: React.FC = () => {
  const { language, isRTL } = useLanguage();

  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="w-full md:w-1/3 text-center md:text-left mb-4 md:mb-0">
            <h3 className="text-xl md:text-2xl font-bold">{COMPANY_NAME}</h3>
          </div>
          <div className="w-full md:w-1/3 text-center mb-4 md:mb-0">
            <p className="text-sm md:text-base">{translations[language].copyright}</p>
          </div>
          <div className="w-full md:w-1/3 text-center md:text-right">
            <div className={`flex justify-center md:justify-end space-x-4 ${isRTL ? 'md:space-x-reverse' : ''}`}>
              <a href="#" className="text-white hover:text-gray-400 p-2"><FaFacebookF size={20} /></a>
              <a href="#" className="text-white hover:text-gray-400 p-2"><FaTwitter size={20} /></a>
              <a href="#" className="text-white hover:text-gray-400 p-2"><FaInstagram size={20} /></a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
