'use client'

import { useSearchParams } from 'next/navigation'
import { useLanguage } from '../contexts/LanguageContext'
import { translations } from '../utils/translations'
import { useEffect, useState } from 'react'

interface PackageCardProps {
  packageNumber: number;
  price: number;
  duration: number;
  data: number;
  minutes: number;
  provider: string;
  countries: string;
  includesCalls: boolean;
}

export default function CheckoutContent() {
  const searchParams = useSearchParams()
  const { language } = useLanguage()
  const [country, setCountry] = useState('')
  const [selectedPackages, setSelectedPackages] = useState<PackageCardProps[]>([])

  useEffect(() => {
    if (searchParams) {
      setCountry(searchParams.get('country') ?? '')
      const packages: PackageCardProps[] = []
      let index = 1
      while (searchParams.has(`package${index}`)) {
        const packageData = searchParams.get(`package${index}`)
        if (packageData) {
          packages.push(JSON.parse(packageData))
        }
        index += 1
      }
      setSelectedPackages(packages)
    }
  }, [searchParams])

  const totalCost = selectedPackages.reduce((acc, p) => acc + p.price, 0)

  return (
    <>
      <h1 className="text-3xl font-bold mb-4">{translations[language].checkout}</h1>
      <h2 className="text-2xl font-bold mb-4">
        {translations[language].selectedPackagesFor} {translations[language][country.toLowerCase()] || country}
      </h2>
      {selectedPackages.map((p) => (
        <div key={p.packageNumber} className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h3 className="text-xl font-bold mb-2">{translations[language].package} {p.packageNumber}</h3>
            <p className="text-2xl font-bold mb-2">₪{p.price}</p>
            <p className="mb-2">{p.duration} {translations[language].days}/{p.data}GB</p>
            <p className="mb-2">{translations[language].travelSim} {p.data}GB+ {p.minutes} {translations[language].minutes}</p>
            <p className="font-bold mb-2">{p.provider}</p>
            <p className="mb-2">{translations[language].availableIn}: {p.countries}</p>
            {p.includesCalls && <p className="mb-2">{translations[language].includesCalls}</p>}
          </div>
        ))}
        <div className="bg-white rounded-lg shadow-md p-6 mt-6">
          <h2 className="text-2xl font-bold mb-4">{translations[language].orderSummary}</h2>
          <p className="text-xl mb-2">{translations[language].totalCost}: ₪{totalCost}</p>
          <button className="mt-4 bg-blue-500 text-white font-bold py-2 px-4 rounded w-full">
            {translations[language].completeOrder}
          </button>
        </div>
      </>
  )
}
