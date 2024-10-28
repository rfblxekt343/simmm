import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../utils/translations';
import { getCountryCode } from '../utils/countryUtils';
import { FaPhone, FaCheck } from 'react-icons/fa';
import 'flag-icons/css/flag-icons.min.css';

export interface PackageCardProps {
  packageNumber: number;
  price: number;
  duration: number;
  data: number;
  minutes: number;
  provider: string;
  countries: string;
  includesCalls: boolean;
  onSelect: (packageData: PackageCardProps) => void;
}

const PackageCard: React.FC<PackageCardProps> = ({
  packageNumber,
  price,
  duration,
  data,
  minutes,
  provider,
  countries,
  includesCalls,
  onSelect,
}) => {
  const { language, isRTL } = useLanguage();

  const handleSelect = () => {
    window.location.href = 'https://www.google.com';
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 transition duration-300 ease-in-out transform hover:scale-105">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-blue-600">{translations[language].package} {packageNumber}</h2>
        <span className="text-3xl font-bold text-blue-600">₪{price}</span>
      </div>
      <div className="mb-4 pb-4 border-b border-gray-200">
        <p className="text-lg"><strong>{duration}</strong> {translations[language].days}</p>
        <p className="text-lg"><strong>{data}GB</strong> {translations[language].data}</p>
      </div>
      <div className="mb-4">
        <p className="flex items-center mb-2">
          <FaPhone className={`${isRTL ? 'ml-2' : 'mr-2'} text-blue-600 inline-block`} />
          <span className="inline-block"><strong>{minutes}</strong> {translations[language].minutes}</span>
        </p>
        <p className="flex items-center mb-2">
          <span className={`fi fi-${getCountryCode(countries, language).toLowerCase()} ${isRTL ? 'ml-2' : 'mr-2'} text-2xl inline-block`}></span>
          <span className="inline-block">{countries}</span>
        </p>
        {includesCalls && (
          <p className="flex items-center mb-2">
            <FaCheck className={`${isRTL ? 'ml-2' : 'mr-2'} text-green-600 inline-block`} />
            <span className="inline-block">{translations[language].includesCalls}</span>
          </p>
        )}
      </div>
      <p className="font-bold mb-4">{provider}</p>
      <p className="mb-4 text-sm text-gray-600">{translations[language].customerServiceInHebrew}</p>
      <button 
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg w-full transition duration-300 ease-in-out"
        onClick={handleSelect}
      >
        {translations[language].select}
      </button>
    </div>
  );
};

export default PackageCard;
