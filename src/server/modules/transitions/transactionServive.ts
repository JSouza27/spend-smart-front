import { format } from 'date-fns';

import { ITransaction, ITransactionModal } from './transaction';
import { ICollection } from '../../shared/interface/Collections';

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
    account: string
  ): Promise<ITransaction> {
    try {
      const path = `extracts/${account}/transactions`;
      const docId = await this.collection.save(path, transaction);

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

  async findForMonth(account: string, date: Date): Promise<ITransaction[]> {
    try {
      const path = `extracts/${account}/transactions`;
      const docs = await this.collection.findWithFilters(path, [
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
      console.error(e);
      throw new Error('Ocorreu um erro na tentativa de buscar as transações.');
    }
  }

  async update(account: string, data: ITransaction) {
    try {
      const path = `extracts/${account}/transactions`;
      await this.collection.update(path, data);

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

  async delete(account: string, id: string) {
    try {
      const path = `extracts/${account}/transactions`;
      await this.collection.delete(path, id);

      return {
        message: 'Documento removido com sucesso',
        status: true
      };
    } catch (e: any) {
      throw new Error('Ocorreu um erro na tentativa de deletar uma transação.');
    }
  }
}
