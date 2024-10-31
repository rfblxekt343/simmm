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
  url: string;
}

interface SortAndFilterProps {
  plans: Plan[];
  onFilterAndSort: (filteredSortedPlans: Plan[]) => void;
}

const SortAndFilter: React.FC<SortAndFilterProps> = ({ plans, onFilterAndSort }) => {
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [planSizeRange, setPlanSizeRange] = useState<[number, number] | null>(null);
  const [durationRange, setDurationRange] = useState<[number, number] | null>(null);

  const handleSortChange = (option: string) => {
    setSortOption(option);
  };

  const applyFiltersAndSort = () => {
    let filteredSortedPlans = [...plans];

    if (selectedCountry) filteredSortedPlans = filteredSortedPlans.filter(plan => plan.country === selectedCountry);
    if (selectedRegion) filteredSortedPlans = filteredSortedPlans.filter(plan => plan.region === selectedRegion);
    if (planSizeRange) filteredSortedPlans = filteredSortedPlans.filter(plan => plan.capacity >= planSizeRange[0] && plan.capacity <= planSizeRange[1]);
    if (durationRange) filteredSortedPlans = filteredSortedPlans.filter(plan => plan.duration >= durationRange[0] && plan.duration <= durationRange[1]);

    if (sortOption === 'Cheapest') filteredSortedPlans.sort((a, b) => a.price - b.price);
    else if (sortOption === 'Most Data') filteredSortedPlans.sort((a, b) => b.capacity - a.capacity);
    else if (sortOption === 'Lowest Price/GB') filteredSortedPlans.sort((a, b) => (a.price / a.capacity) - (b.price / b.capacity));

    onFilterAndSort(filteredSortedPlans);
  };

  useEffect(() => {
    applyFiltersAndSort();
  }, [selectedCountry, selectedRegion, sortOption, planSizeRange, durationRange]);

  return (
    <div className="filter-panel bg-white p-4 rounded-md shadow-sm w-full">
      <h3 className="text-lg font-semibold mb-1">Filters</h3>

      <div className="mb-2">
        <h4 className="font-medium text-sm">Sort by</h4>
        <div className="flex flex-wrap mt-1 gap-1">
          {['Cheapest', 'Most Data', 'Lowest Price/GB'].map(option => (
            <button
              key={option}
              onClick={() => handleSortChange(option)}
              className={`py-1 px-2 text-xs rounded-sm transition duration-200 ${sortOption === option ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black hover:bg-blue-300'}`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-2">
        <h4 className="font-medium text-sm">Plan Size</h4>
        <div className="flex flex-wrap mt-1 gap-1">
          {[
            { label: '0-5 GB', range: [0, 5] },
            { label: '5-10 GB', range: [5, 10] },
            { label: '10-20 GB', range: [10, 20] },
            { label: '20+ GB', range: [20, 100] },
          ].map(({ label, range }) => (
            <button
              key={label}
              onClick={() => setPlanSizeRange(range as [number, number])}
              className={`py-1 px-2 text-xs rounded-sm transition duration-200 ${planSizeRange === range ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black hover:bg-blue-300'}`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-2">
        <h4 className="font-medium text-sm">Duration</h4>
        <div className="flex flex-wrap mt-1 gap-1">
          {[
            { label: '1 Month', range: [1, 1] },
            { label: '3 Months', range: [3, 3] },
            { label: '6 Months', range: [6, 6] },
            { label: '1 Year', range: [12, 12] },
          ].map(({ label, range }) => (
            <button
              key={label}
              onClick={() => setDurationRange(range as [number, number])}
              className={`py-1 px-2 text-xs rounded-sm transition duration-200 ${durationRange === range ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black hover:bg-blue-300'}`}
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
