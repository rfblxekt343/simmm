'use client';

import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/utils/translations';
import { FaMobileAlt, FaQuestionCircle, FaRocket } from 'react-icons/fa';

const BlogPosts: React.FC = () => {
  const { language } = useLanguage();

  const posts: { title: keyof typeof translations['en']; excerpt: keyof typeof translations['en']; icon: React.ComponentType<{ className?: string }> }[] = [
    { title: 'supportedDevices', excerpt: 'supportedDevicesExcerpt', icon: FaMobileAlt },
    { title: 'whatIsESIM', excerpt: 'whatIsESIMExcerpt', icon: FaQuestionCircle },
    { title: 'howToActivate', excerpt: 'howToActivateExcerpt', icon: FaRocket },
  ];

  return (
    <section className="w-full mb-12">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-gray-800">{translations[language].fromOurBlog}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post, index) => (
          <div key={index} className="card flex flex-col items-center text-center">
            <post.icon className="text-3xl md:text-4xl text-primary-500 mb-4" />
            <h3 className="text-lg md:text-xl font-semibold mb-2">{translations[language][post.title]}</h3>
            <p className="text-sm md:text-base text-gray-600 mb-4">{translations[language][post.excerpt]}</p>
            <a href="#" className="btn-primary mt-auto text-sm md:text-base">
              {translations[language].readMore}
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BlogPosts;
