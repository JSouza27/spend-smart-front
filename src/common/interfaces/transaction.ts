export interface ITransactionModel {
  description: string;
  invoiceDueDate: Date;
  value: number;
  type: 'income' | 'expense';
}
