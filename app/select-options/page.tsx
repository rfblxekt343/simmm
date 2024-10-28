'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/utils/translations';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import PackageCard, { PackageCardProps } from '../../components/PackageCard';
import { getCountryName } from '@/utils/countryUtils';

interface Plan {
  externalId: string;
  providerName: string;
  providerLogo: string;
  displayName: string;
  capacity: number;
  price: number;
  currency: string;
  duration: number;
  coverages: string[];
  networkSpeed: string[];
  url: string;
  metadata: string | null;
  promoCode: any;
  phoneNumber: boolean;
  coverageType: string;
  inventoryCount: number;
}

export default function SelectOptions() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { language } = useLanguage();
  const [options, setOptions] = useState({
    country: '',
    duration: '',
    includesCalls: false,
    data: '',
  });
  const [plans, setPlans] = useState<Plan[]>([]);

  useEffect(() => {
    const countryCode = searchParams.get('country');
    if (!countryCode) {
      setPlans([]);
      return;
    }

    const country = getCountryName(countryCode, language);
    const duration = searchParams.get('duration');
    const includesCalls = searchParams.get('includesCalls');
    const data = searchParams.get('data');

    // Update options
    setOptions({
      country: country || '',
      duration: duration || '',
      includesCalls: includesCalls === 'true',
      data: data || '',
    });

    // Fetch plans with countryCode directly
    fetchPlans(countryCode);
  }, [searchParams, language]);

  const fetchPlans = async (countryCode: string) => {
    try {
      console.log('Fetching plans for country:', countryCode);
      const response = await fetch(`/api/plans?country=${countryCode}`);
      if (!response.ok) {
        throw new Error('Failed to fetch plans');
      }
      const data = await response.json();
      setPlans(data);
    } catch (error) {
      console.error('Error fetching plans:', error);
      setPlans([]);
    }
  };

  const filteredPlans = plans.filter((plan) => {
    if (options.duration && plan.duration !== parseInt(options.duration)) return false;
    if (options.data) {
      const dataAmount = plan.capacity === -1 ? Infinity : plan.capacity;
      if (dataAmount < parseInt(options.data)) return false;
    }
    if (options.includesCalls && !plan.phoneNumber) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar />
      <main className="container mx-auto py-6">
        <h1 className="text-3xl font-bold mb-6 text-center">
          {translations[language].selectOptions}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlans.map((plan) => (
            <PackageCard
              key={plan.externalId}
              packageNumber={plan.externalId}
              price={plan.price}
              currency={plan.currency}
              duration={plan.duration}
              data={plan.capacity === -1 ? 'Unlimited' : `${plan.capacity} GB`}
              minutes={plan.phoneNumber ? 'Included' : 'Not included'}
              provider={plan.providerName}
              countries={plan.coverages.join(', ')}
              includesCalls={plan.phoneNumber}
              onSelect={() => window.open(plan.url, '_blank')}
            />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
