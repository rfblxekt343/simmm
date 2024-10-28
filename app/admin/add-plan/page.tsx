'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import NavBar from '../../../components/NavBar';
import Footer from '../../../components/Footer';

export default function AddPlan() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    providerName: '',
    providerLogo: '',
    countryName: '',
    planType: '',
    discountCode: '',
    discountAmount: '',
    dataAmount: '',
    pricePerGB: '',
    duration: '',
    coveredCountries: '',
    additionalInfo: '',
    networkQuality: '',
    networkSpeed: '',
    compatibleCountries: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/plans', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Plan added successfully!');
        router.push('/admin/plans');
      } else {
        throw new Error('Failed to add plan');
      }
    } catch (error) {
      console.error('Error adding plan:', error);
      alert('Failed to add plan. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Add New Plan</h1>
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="providerName">
              Provider Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="providerName"
              type="text"
              name="providerName"
              value={formData.providerName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dataAmount">
              Data Amount (GB)
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="dataAmount"
              type="number"
              step="0.1"
              name="dataAmount"
              value={formData.dataAmount}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="pricePerGB">
              Price per GB
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="pricePerGB"
              type="number"
              step="0.01"
              name="pricePerGB"
              value={formData.pricePerGB}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="duration">
              Duration (days)
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="duration"
              type="number"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="coveredCountries">
              Covered Countries
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="coveredCountries"
              type="number"
              name="coveredCountries"
              value={formData.coveredCountries}
              onChange={handleChange}
              required
            />
          </div>
          {/* Add similar input fields for all other form data */}
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Add Plan
            </button>
          </div>
        </form>
      </main>
      <Footer />
    </div>
  );
}
