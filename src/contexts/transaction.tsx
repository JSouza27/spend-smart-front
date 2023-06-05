import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react';

import { ITransaction } from '../server/modules/transitions/transaction';
import { TransactionService } from '../server/modules/transitions/transactionServive';
import { CustomExceptionHandler } from '../common/exception/customExceptionHandler';
import { Collection } from '../server/core/firebase/collection/collection';
import { ITransactionModel } from '../common/interfaces/transaction';
import { useAuthentication } from './auth';
import { parseCookies } from 'nookies';
import { useRouter } from 'next/router';

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
  const { user, isAuthenticated } = useAuthentication();
  const router = useRouter();

  const collection = new Collection();
  const service = new TransactionService(collection);

  const getTransactionsPerMonth = useCallback(async () => {
    try {
      if (user === null) {
        const customExceptionHandler = new CustomExceptionHandler(
          'Usuário inexistente!',
          'Erro ao buscar documentos'
        );

        customExceptionHandler.execute();
        return;
      }

      const localTransactions = await service.findForMonth(
        user.account_id,
        date
      );
      setTransactions(localTransactions);
    } catch (e: any) {
      const customExceptionHandler = new CustomExceptionHandler(
        e.message,
        'Erro ao buscar documentos'
      );

      customExceptionHandler.execute();
    }
  }, [date, isAuthenticated, user]);

  useEffect(() => {
    if (isAuthenticated && user) getTransactionsPerMonth();
  }, [getTransactionsPerMonth, date, isAuthenticated, user]);

  useEffect(() => {
    const { 'nextauth.token': token } = parseCookies();

    if (!token) {
      router.push('/');
    }
  }, []);

  const saveTransaction = async (transaction: ITransactionModel) => {
    try {
      if (user === null) {
        const customExceptionHandler = new CustomExceptionHandler(
          'Usuário inexistente!',
          'Erro ao salvar um documento'
        );

        customExceptionHandler.execute();
        return;
      }

      await service.create(transaction, user.account_id);
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
      if (user === null) {
        const customExceptionHandler = new CustomExceptionHandler(
          'Usuário inexistente!',
          'Erro ao atualizar um documento'
        );

        customExceptionHandler.execute();
        return;
      }

      await service.update(user.account_id, transaction);
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
      if (user === null) {
        const customExceptionHandler = new CustomExceptionHandler(
          'Usuário inexistente!',
          'Erro ao deletar um documento'
        );

        customExceptionHandler.execute();
        return;
      }

      await service.delete(user.account_id, id);
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
