"use client";
import React, { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/utils/translations";
import "/node_modules/flag-icons/css/flag-icons.min.css";
import Link from "next/link";
import countries from "i18n-iso-countries";
import en from "i18n-iso-countries/langs/en.json";
import he from "i18n-iso-countries/langs/he.json";
import ar from "i18n-iso-countries/langs/ar.json";
import ru from "i18n-iso-countries/langs/ru.json";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

countries.registerLocale(en);
countries.registerLocale(he);
countries.registerLocale(ar);
countries.registerLocale(ru);

interface Country {
  name: string;
  code: string;
}

const PopularPackages: React.FC = () => {
  const { language } = useLanguage();
  const [countryList, setCountryList] = useState<Country[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDuration, setSelectedDuration] = useState<number>(7);
  const [includesCalls, setIncludesCalls] = useState(false);
  const [isDurationOpen, setIsDurationOpen] = useState(false);
  const durationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const popularCountryCodes = [
      "FR",
      "ES",
      "IT",
      "US",
      "GB",
      "DE",
      "GR",
      "TR",
      "TH",
      "JP",
      "PT",
      "NL",
      "AE",
      "MX",
      "CA",
      "AU",
      "HR",
      "EG",
      "CZ",
      "HU",
      "AT",
      "CH",
      "SG",
      "MY",
      "VN",
      "ID",
      "PH",
      "BR",
      "MA",
      "ZA",
    ];
    const countryData = popularCountryCodes.map((code) => ({
      name: countries.getName(code, language) || code,
      code: code.toLowerCase(),
    }));
    setCountryList(countryData);
  }, [language]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        durationRef.current &&
        !durationRef.current.contains(event.target as Node)
      ) {
        setIsDurationOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const filteredCountries = countryList.filter((country) =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const durationOptions = [7, 14, 30, 90];

  return (
    <section className="w-full bg-white rounded-lg shadow-lg p-6">
      <div className="pt-10 pb-10">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-center text-gray-800">
          {translations[language].popularPackages || "Popular Packages"}
        </h2>
        <p className="text-xl md:text-2xl text-center text-gray-600">
          {translations[language].popularPackagesDescription ||
            "Select a country to see available eSIM packages"}
        </p>
      </div>

      <div className="mb-6">
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <input
            type="text"
            placeholder={
              translations[language].searchCountry || "Search country..."
            }
            className="w-full sm:w-64 md:w-72 p-2 border border-gray-300 rounded-full text-center text-sm sm:text-base"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="relative w-full sm:w-64 md:w-36" ref={durationRef}>
            <button
              onClick={() => setIsDurationOpen(!isDurationOpen)}
              className="w-full px-4 py-2 border border-gray-300 rounded-full text-center bg-white flex items-center justify-between text-sm sm:text-base"
            >
              <span className="px-2">
                {selectedDuration} {translations[language].days}
              </span>
              {isDurationOpen ? (
                <FaChevronUp className="ml-3" />
              ) : (
                <FaChevronDown className="ml-3" />
              )}
            </button>
            {isDurationOpen && (
              <div className="absolute z-10 w-full bg-white border border-gray-300 mt-1 rounded-md shadow-lg">
                {durationOptions.map((days) => (
                  <div
                    key={days}
                    className="p-2 hover:bg-gray-100 cursor-pointer text-sm sm:text-base"
                    onClick={() => {
                      setSelectedDuration(days);
                      setIsDurationOpen(false);
                    }}
                  >
                    {days} {translations[language].days}
                  </div>
                ))}
              </div>
            )}
          </div>
          <button
            onClick={() => setIncludesCalls(!includesCalls)}
            className={`w-full sm:w-64 md:w-72 px-2 sm:px-4 py-2 rounded-full text-sm sm:text-base ${
              includesCalls
                ? "bg-green-500 text-white border-2 border-green-600"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {translations[language].includesCalls}
          </button>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-6">
        {filteredCountries.map((country) => {
          const queryParams = new URLSearchParams({
            country: country.code, // This part is correct
            duration: selectedDuration.toString(),
            includesCalls: includesCalls.toString(),
          }).toString();

          const linkHref = `/select-options?${queryParams}`;

          return (
            <Link href={linkHref} key={country.code}>
              <div className="flex flex-col items-center justify-center p-3 sm:p-6 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-300 shadow-md hover:shadow-lg">
                <span
                  className={`fi fi-${country.code} mb-2 sm:mb-4 text-4xl sm:text-5xl md:text-6xl inline-block`}
                ></span>
                <span className="text-xs sm:text-sm md:text-base font-medium text-center inline-block">
                  {country.name}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default PopularPackages;
