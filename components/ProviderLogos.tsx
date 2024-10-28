"use client";

import Image from 'next/image';
import React, { useEffect, useState } from 'react';

const ProviderLogos = () => {
  const [logos, setLogos] = useState<string[]>([]);

  useEffect(() => {
    // This is a placeholder. In a real-world scenario, you'd fetch this data from an API or database
    const logoFiles = [
      '1200x630wa.png', '474px-Orange_logo.svg.png', '512x512bb.jpg', '512x512bb__1_.jpg',
      'Group.png', 'O2-logo.png', 'UAh5Xkk7_400x400.png', 'airhub_logo-min.png',
      'app-icon.png', 'bnesim-logo-2023.png', 'dtac-logo.webp',
      'esimx-logo.webp', 'estravelsim-logo.png', 'gigsky_logo.png', 'globalesim_logo.jpeg',
      'gomoworld-logo.webp', 'instabridge-logo.png', 'jetpac-logo.webp', 'keepgo-logo.png',
      'logo-bouygues.png', 'logo.28e6c798.png',
      'mogo_esim_logo.jpg', 'montyesim-logo.webp', 'nomad_logo_dark.png',
      'saily-logo.webp', 'sim2fly-logo.png', 'simoptions-logo.svg', 'te__le__chargement.jpeg',
      'textr-logo.webp', 'ubigi_logo.png', 'wifimap-logo.webp', 'yohomobile-logo_1.png'
    ];
    setLogos(logoFiles);
  }, []);

  return (
      <div className="my-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-gray-800">Our Provider Partners</h2>
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-6">
            <div className="flex flex-wrap justify-center items-center gap-6">
              {logos.map((logo, index) => (
                  <div key={index} className="w-16 h-16 relative">
                    <Image
                        src={`/providers/logos/${logo}`}
                        alt={`Provider logo ${index + 1}`}
                        layout="fill"
                        objectFit="contain"
                    />
                  </div>
              ))}
            </div>
          </div>
        </div>
      </div>
  );
};

export default ProviderLogos;
