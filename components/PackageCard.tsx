// In PackageCard.tsx
import Image from 'next/image';
//import AiraloLogo from '../public/airalo-logo.png'; // Import Airalo logo
//import AnesimLogo from '../public/anesim-logo.png'; // Import Anesim logo
import { FaPhone, FaCheck } from 'react-icons/fa';
import "flag-icons/css/flag-icons.min.css";

export interface PackageCardProps {
  packageNumber: string;
  price: string;
  duration: number;
  data: string;
  minutes: string;
  provider: string;
  includesCalls: boolean;
  onSelect: () => void;
  url: string;
}

const PackageCard: React.FC<PackageCardProps> = ({
  packageNumber,
  price,
  duration,
  data,
  minutes,
  provider,
  includesCalls,
  url,
  onSelect
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-5 transform transition duration-200 hover:scale-105">
      <div className="flex items-center justify-between mb-3">
        <span className="text-3xl font-bold text-blue-600">{price}</span>
        {provider === 'Airalo' && <Image src={AiraloLogo} alt="Airalo Logo" width={40} height={40} />}
        {provider === 'Anesim' && <Image src={AnesimLogo} alt="Anesim Logo" width={40} height={40} />}
      </div>
      <div className="border-b pb-3 mb-3">
        <p className="text-lg"><strong>{duration}</strong> Days</p>
        <p className="text-lg"><strong>{data}</strong> Data</p>
      </div>
      <div className="mb-3">
        <p className="flex items-center">
          <FaPhone className="mr-2 text-blue-600" />
          <span>{minutes}</span>
        </p>
        {includesCalls && (
          <p className="flex items-center">
            <FaCheck className="mr-2 text-green-600" />
            <span>Calls Included</span>
          </p>
        )}
      </div>
      <button
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg w-full transition duration-200"
        onClick={onSelect}
      >
        Select Package
      </button>
    </div>
  );
};

export default PackageCard;
