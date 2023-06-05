export interface ITransactionModal {
  description: string;
  invoiceDueDate: Date;
  value: number;
  type: 'income' | 'expense';
}

export interface ITransaction {
  id: string;
  description: string;
  invoiceDueDate: string;
  value: number;
  type: 'income' | 'expense';
}
