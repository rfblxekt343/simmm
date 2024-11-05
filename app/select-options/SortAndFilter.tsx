// SortAndFilter.tsx
import React, { useState, useEffect } from 'react';

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

interface SortAndFilterProps {
  plans: Plan[];
  onFilterAndSort: (filteredSortedPlans: Plan[]) => void;
}

const SortAndFilter: React.FC<SortAndFilterProps> = ({ plans, onFilterAndSort }) => {
  const [sortOption, setSortOption] = useState('');
  const [planSizeRange, setPlanSizeRange] = useState<[number, number] | null>(null);
  const [durationRange, setDurationRange] = useState<[number, number] | null>(null);

  const handleSortChange = (option: string) => {
    setSortOption(option);
  };

  const convertToGB = (capacity: number): number => {
    return capacity >= 1024 ? capacity / 1024 : capacity / 1024;
  };

  const applyFiltersAndSort = () => {
    let filteredSortedPlans = [...plans];

    // Apply size filter
    if (planSizeRange) {
      filteredSortedPlans = filteredSortedPlans.filter(plan => {
        const capacityGB = convertToGB(plan.capacity);
        return capacityGB >= planSizeRange[0] && capacityGB <= planSizeRange[1];
      });
    }

    // Apply duration filter
    if (durationRange) {
      filteredSortedPlans = filteredSortedPlans.filter(plan => {
        const duration = Math.floor(plan.duration / 30); // Convert days to months
        return duration >= durationRange[0] && duration <= durationRange[1];
      });
    }

    // Apply sorting
    switch (sortOption) {
      case 'Cheapest':
        filteredSortedPlans.sort((a, b) => a.price - b.price);
        break;
      case 'Most Data':
        filteredSortedPlans.sort((a, b) => convertToGB(b.capacity) - convertToGB(a.capacity));
        break;
      case 'Lowest Price/GB':
        filteredSortedPlans.sort((a, b) => {
          const pricePerGBa = a.price / convertToGB(a.capacity);
          const pricePerGBb = b.price / convertToGB(b.capacity);
          return pricePerGBa - pricePerGBb;
        });
        break;
      default:
        break;
    }

    onFilterAndSort(filteredSortedPlans);
  };

  useEffect(() => {
    applyFiltersAndSort();
  }, [sortOption, planSizeRange, durationRange, plans]);

  const clearFilters = () => {
    setSortOption('');
    setPlanSizeRange(null);
    setDurationRange(null);
  };

  return (
    <div className="filter-panel bg-white p-4 rounded-md shadow-sm w-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Filters</h3>
        <button
          onClick={clearFilters}
          className="text-sm text-blue-600 hover:text-blue-800"
        >
          Clear all
        </button>
      </div>

      <div className="mb-4">
        <h4 className="font-medium text-sm mb-2">Sort by</h4>
        <div className="flex flex-wrap gap-2">
          {['Cheapest', 'Most Data', 'Lowest Price/GB'].map(option => (
            <button
              key={option}
              onClick={() => handleSortChange(option)}
              className={`py-1.5 px-3 text-sm rounded transition duration-200 ${
                sortOption === option 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <h4 className="font-medium text-sm mb-2">Data Amount</h4>
        <div className="flex flex-wrap gap-2">
          {[
            { label: '0-5 GB', range: [0, 5] },
            { label: '5-10 GB', range: [5, 10] },
            { label: '10-20 GB', range: [10, 20] },
            { label: '20+ GB', range: [20, 1000] },
          ].map(({ label, range }) => (
            <button
              key={label}
              onClick={() => setPlanSizeRange(range as [number, number])}
              className={`py-1.5 px-3 text-sm rounded transition duration-200 ${
                JSON.stringify(planSizeRange) === JSON.stringify(range)
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <h4 className="font-medium text-sm mb-2">Duration</h4>
        <div className="flex flex-wrap gap-2">
          {[
            { label: '1 Month', range: [1, 1] },
            { label: '3 Months', range: [3, 3] },
            { label: '6 Months', range: [6, 6] },
            { label: '1 Year', range: [12, 12] },
          ].map(({ label, range }) => (
            <button
              key={label}
              onClick={() => setDurationRange(range as [number, number])}
              className={`py-1.5 px-3 text-sm rounded transition duration-200 ${
                JSON.stringify(durationRange) === JSON.stringify(range)
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SortAndFilter;