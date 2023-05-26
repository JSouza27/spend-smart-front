import React from 'react';
import { TransactionProvider } from './transaction';

type ContextsProps = {
  children: React.ReactNode;
};

export default function Contexts({ children }: ContextsProps) {
  return <TransactionProvider>{children}</TransactionProvider>;
}
