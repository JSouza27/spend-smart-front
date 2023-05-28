import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react';

import { ITransaction } from '../server/modules/transitions/transaction';
import { TransactionService } from '../server/modules/transitions/transactionServive';
import mockUsuario from '../data/mocks/mockUsuario';
import { CustomExceptionHandler } from '../common/exception/customExceptionHandler';
import { Collection } from '../server/core/firebase/collection/collection';
import { ITransactionModel } from '../common/interfaces/transaction';

type TransactionContextData = {
  saveTransaction: (transaction: ITransactionModel) => void;
  getTransactionsPerMonth: () => void;
  updateTransaction: (data: ITransaction) => void;
  deleteTransaction: (id: string) => void;
  transactions: ITransaction[] | [];
  isEdit: boolean;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
  date: Date;
};

type ProviderProps = {
  children: React.ReactNode;
};

export const TransactionContext = createContext<TransactionContextData>(
  {} as TransactionContextData
);

export function TransactionProvider({ children }: ProviderProps) {
  const [transactions, setTransactions] = useState<ITransaction[] | []>([]);
  const [date, setDate] = useState(new Date());
  const [isEdit, setIsEdit] = useState(false);

  const user = mockUsuario;
  const collection = new Collection();
  const service = new TransactionService(collection);
  const accountPath = `extract/${user.account}/transactions`;

  const getTransactionsPerMonth = useCallback(async () => {
    try {
      const localTransactions = await service.findForMonth(accountPath, date);
      setTransactions(localTransactions);
    } catch (e: any) {
      const customExceptionHandler = new CustomExceptionHandler(
        e.message,
        'Erro ao buscar documentos'
      );

      customExceptionHandler.execute();
    }
  }, [date]);

  useEffect(() => {
    getTransactionsPerMonth();
  }, [getTransactionsPerMonth, date]);

  const saveTransaction = async (transaction: ITransactionModel) => {
    try {
      await service.create(transaction, accountPath);
      await getTransactionsPerMonth();
    } catch (e: any) {
      const customExceptionHandler = new CustomExceptionHandler(
        e.message,
        'Erro ao salvar um documento'
      );

      customExceptionHandler.execute();
    }
  };

  const updateTransaction = async (transaction: ITransaction) => {
    try {
      await service.update(accountPath, transaction);
      getTransactionsPerMonth();
    } catch (e: any) {
      const customExceptionHandler = new CustomExceptionHandler(
        e.message,
        'Erro ao atualizar um documento'
      );

      customExceptionHandler.execute();
    }
  };

  const deleteTransaction = async (id: string) => {
    try {
      await service.delete(accountPath, id);
      getTransactionsPerMonth();
    } catch (e: any) {
      const customExceptionHandler = new CustomExceptionHandler(
        e.message,
        'Erro ao deletar um documento'
      );

      customExceptionHandler.execute();
    }
  };

  return (
    <TransactionContext.Provider
      value={{
        saveTransaction,
        transactions,
        deleteTransaction,
        getTransactionsPerMonth,
        updateTransaction,
        isEdit,
        setIsEdit,
        setDate,
        date
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
}

export function useTransaction() {
  const {
    saveTransaction,
    transactions,
    deleteTransaction,
    getTransactionsPerMonth,
    updateTransaction,
    isEdit,
    setDate,
    setIsEdit,
    date
  } = useContext(TransactionContext);
  return {
    saveTransaction,
    transactions,
    deleteTransaction,
    getTransactionsPerMonth,
    updateTransaction,
    isEdit,
    setDate,
    setIsEdit,
    date
  };
}
