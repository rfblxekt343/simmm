import React from 'react';
import { FaPhone, FaCheck, FaGlobe, FaClock, FaDatabase } from 'react-icons/fa';

const ProviderLogo = ({ provider }: { provider: string }) => {
  const getLogoUrl = () => {
    switch (provider.toLowerCase()) {
      case 'airalo':
        return '/providers/logos/UAh5Xkk7_400x400.png';
      case 'bnesim':
        return '/providers/logos/bnesim-logo-2023.png';
      default:
        return null;
    }
  };

  const logoUrl = getLogoUrl();

  if (!logoUrl) {
    return <span className="text-sm font-semibold text-gray-700">{provider}</span>;
  }

  return (
    <div className="w-12 h-12 relative p-1.5 bg-white rounded-lg shadow-sm">
      <img
        src={logoUrl}
        alt={`${provider} Logo`}
        className="object-contain w-full h-full"
      />
    </div>
  );
};

const InfoBadge = ({ icon: Icon, value }) => (
  <div className="flex items-center space-x-1.5 text-gray-600">
    <Icon className="w-4 h-4 text-blue-600" />
    <span className="text-sm font-medium">{value}</span>
  </div>
);

const PackageCard = ({
  packageNumber,
  price,
  duration,
  data,
  minutes,
  provider,
  includesCalls,
  url,
  onSelect,
  children
}) => {
  const formatDuration = (duration) => {
    if (duration === -1) {
      return 'No Expiry';
    }
    return `${duration} Days`;
  };

  return (
    <div className="relative bg-white rounded-lg shadow-md transition-all duration-300 hover:shadow-xl border border-gray-100 overflow-hidden">
      <div className="h-0.5 bg-gradient-to-r from-blue-500 to-blue-600" />
      
      <div className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-blue-600">{price}</span>
            {children}
          </div>
          <ProviderLogo provider={provider} />
        </div>

        {/* Info grid */}
        <div className="space-y-2 mb-3">
          <InfoBadge
            icon={FaClock}
            value={formatDuration(duration)}
          />
          <InfoBadge
            icon={FaDatabase}
            value={data}
          />
          <div className="flex justify-between items-center">
            <InfoBadge
              icon={FaPhone}
              value={minutes}
            />
            {includesCalls && (
              <span className="text-xs text-green-600 font-medium flex items-center">
                <FaCheck className="w-3 h-3 mr-1" />
                Calls Included
              </span>
            )}
          </div>
        </div>

        {/* Button */}
        <button
          onClick={onSelect}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-all duration-200 flex items-center justify-center space-x-1.5 text-sm"
        >
          <FaGlobe className="w-4 h-4" />
          <span>Select Package</span>
        </button>
      </div>
    </div>
  );
};

export default PackageCard;