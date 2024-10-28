'use client';

import React from 'react';
import { LanguageProvider } from '../contexts/LanguageContext';

interface ClientRootProps {
  children: React.ReactNode;
}

const ClientRoot: React.FC<ClientRootProps> = ({ children }) => {
  return (
    <LanguageProvider>
      {children}
    </LanguageProvider>
  );
};

export default ClientRoot;
