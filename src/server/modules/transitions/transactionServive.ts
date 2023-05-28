import { format } from 'date-fns';

import { ITransaction, ITransactionModal } from './transaction';
import { ICollection } from '../../shared/interfaces/Collections';

export class TransactionService {
  private collection: ICollection;

  constructor(collection: ICollection) {
    this.collection = collection;
  }

  private firstDay(dt: Date) {
    return new Date(dt.getFullYear(), dt.getMonth(), 1);
  }

  private lastDay(dt: Date) {
    return new Date(dt.getFullYear(), dt.getMonth() + 1, 0, 23, 59, 59);
  }

  private transformDateToString(dateInSeconds: number): string {
    const date = new Date(0);
    const dt = date.setUTCSeconds(dateInSeconds);

    return format(dt, 'dd/MM/yyyy');
  }

  async create(
    transaction: ITransactionModal,
    accountPath: string
  ): Promise<ITransaction> {
    try {
      const docId = await this.collection.save(accountPath, transaction);

      const response = {
        id: docId,
        description: transaction.description,
        invoiceDueDate: format(transaction.invoiceDueDate, 'dd/MM/yyyy'),
        value: transaction.value,
        type: transaction.type
      };

      return response;
    } catch (e: any) {
      throw new Error('Ocorreu um erro na tentativa de criar uma transação.');
    }
  }

  async findAll(accountPath: string): Promise<ITransaction[]> {
    try {
      const allDocs = await this.collection.findAll(accountPath);

      return allDocs.map((doc) => ({
        id: doc.id,
        description: doc.description,
        invoiceDueDate: this.transformDateToString(doc.invoiceDueDate.seconds),
        value: doc.value,
        type: doc.type
      }));
    } catch (e: any) {
      throw new Error('Ocorreu um erro na tentativa de buscar as transações.');
    }
  }

  async findForMonth(accountPath: string, date: Date): Promise<ITransaction[]> {
    try {
      const docs = await this.collection.findWithFilters(accountPath, [
        {
          attribute: 'invoiceDueDate',
          op: '>=',
          value: this.firstDay(date)
        },
        { attribute: 'invoiceDueDate', op: '<=', value: this.lastDay(date) }
      ]);

      const transactions = docs.map((doc) => ({
        id: doc.id,
        description: doc.description,
        invoiceDueDate: this.transformDateToString(doc.invoiceDueDate.seconds),
        value: doc.value,
        type: doc.type
      }));

      return transactions;
    } catch (e: any) {
      throw new Error('Ocorreu um erro na tentativa de buscar as transações.');
    }
  }

  async update(accountPath: string, data: ITransaction) {
    try {
      await this.collection.update(accountPath, data);

      return {
        message: 'Documento atualizado com sucesso',
        status: true
      };
    } catch (e: any) {
      throw new Error(
        'Ocorreu um erro na tentativa de atualizar uma transação.'
      );
    }
  }

  async delete(accountPath: string, id: string) {
    try {
      await this.collection.delete(accountPath, id);

      return {
        message: 'Documento removido com sucesso',
        status: true
      };
    } catch (e: any) {
      throw new Error('Ocorreu um erro na tentativa de deletar uma transação.');
    }
  }
}
