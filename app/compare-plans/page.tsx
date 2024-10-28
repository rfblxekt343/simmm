'use client';

import React, { useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/utils/translations';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import PackageCard, { PackageCardProps } from '../../components/PackageCard';

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

const ComparePlansPage: React.FC = () => {
  const { language } = useLanguage();
  const [plans, setPlans] = useState<Plan[]>([]);
  const [providers, setProviders] = useState<string[]>([]);

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const response = await fetch('/api/plans');
      if (!response.ok) {
        throw new Error('Failed to fetch plans');
      }
      const data: Plan[] = await response.json();
      setPlans(data);
      setProviders([...new Set(data.map(plan => plan.providerName))]);
    } catch (error) {
      console.error('Error fetching plans:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar />
      <main className="container mx-auto py-6">
        <h1 className="text-3xl font-bold mb-6 text-center">
          {translations[language].comparePlans}
        </h1>

        {providers.map(provider => (
          <div key={provider} className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{provider}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {plans
                .filter(plan => plan.providerName === provider)
                .map((plan) => (
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
          </div>
        ))}
      </main>
      <Footer />
    </div>
  );
};

export default ComparePlansPage;
