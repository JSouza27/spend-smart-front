import React from 'react';

import { TransactionProvider } from './transaction';
import { AuthProvider } from './auth';

type ContextsProps = {
  children: React.ReactNode;
};

export default function Contexts({ children }: ContextsProps) {
  return (
    <AuthProvider>
      <TransactionProvider>{children}</TransactionProvider>
    </AuthProvider>
  );
}
