// SelectOptions.tsx

"use client"
import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/utils/translations';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import PackageCard from '../../components/PackageCard';
import { getCountryName } from '@/utils/countryUtils';
import SortAndFilter from './SortAndFilter';
import LoadingSkeleton from '../../components/LoadingSkeleton';

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

const formatPrice = (price: number, currency: string, language: string) => {
  try {
    return new Intl.NumberFormat(`${language}-US`, {
      style: 'currency',
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  } catch (error) {
    return `$${price.toFixed(2)}`;
  }
};

const SelectOptions: NextPage = () => {
  const searchParams = useSearchParams();
  const { language } = useLanguage();
  const [options, setOptions] = useState({
    country: '',
    duration: '',
    includesCalls: false,
    data: '',
  });
  const [plans, setPlans] = useState<Plan[]>([]);
  const [filteredPlans, setFilteredPlans] = useState<Plan[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const countryCode = searchParams.get('country');
    if (!countryCode) {
      setPlans([]);
      setFilteredPlans([]);
      setIsLoading(false);
      return;
    }

    const country = getCountryName(countryCode, language);
    const duration = searchParams.get('duration');
    const includesCalls = searchParams.get('includesCalls');
    const data = searchParams.get('data');

    setOptions({
      country: country || '',
      duration: duration || '',
      includesCalls: includesCalls === 'true',
      data: data || '',
    });

    fetchPlans(countryCode);
  }, [searchParams, language]);

  const fetchPlans = async (countryCode: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/plans?country=${countryCode}`);
      if (!response.ok) throw new Error('Failed to fetch plans');
      const data = await response.json();
      setPlans(data);
      setFilteredPlans(data);
    } catch (error) {
      console.error('Error fetching plans:', error);
      setPlans([]);
      setFilteredPlans([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSort = (sortedPlans: Plan[]) => {
    setFilteredPlans(sortedPlans);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <NavBar />
      <main className="container mx-auto py-6 flex flex-col md:flex-row">
        <div className="w-full md:w-1/4 lg:w-1/4">
          <SortAndFilter plans={plans} onFilterAndSort={handleSort} />
        </div>
        <div className="flex-1 md:ml-4">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {Array.from({ length: 6 }).map((_, index) => (
                <LoadingSkeleton key={index} />
              ))}
            </div>
          ) : (
            <h1 className="text-3xl font-bold mb-6 text-center">
              Explore the best eSIM packages for {options.country}
            </h1>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {filteredPlans.map((plan, index) => (
              <PackageCard
                key={plan.externalId}
                packageNumber={plan.externalId}
                price={formatPrice(plan.price, plan.currency, language)}
                currency={plan.currency}
                duration={plan.duration}
                data={
                  plan.capacity === -1
                    ? 'Unlimited'
                    : plan.capacity >= 1024
                    ? `${(plan.capacity / 1024).toFixed(2)} GB`
                    : `${plan.capacity} MB`
                }
                minutes={plan.phoneNumber ? 'Included' : 'Not included'}
                provider={plan.providerName}
                includesCalls={plan.phoneNumber}
                url={plan.url}
                onSelect={() => window.open(plan.url, '_blank')}
              >
                {index === 0 && (
                  <span className="text-green-600 font-bold text-sm inline-flex items-center">
                    🌟 Best Offer
                  </span>
                )}
              </PackageCard>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SelectOptions;
