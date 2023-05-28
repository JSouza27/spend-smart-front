import { useEffect, useState } from 'react';
import { useTransaction } from '../contexts/transaction';
import { ITransaction } from '../server/modules/transitions/transaction';

export function useReducerTransactionValues() {
  const [financialData, setFinancialData] = useState({
    totalIncomes: 0,
    totalExpenses: 0,
    balanceOfTheMonth: 0
  });

  const { transactions } = useTransaction();

  function reducer(value: number, transaction: ITransaction) {
    return value + transaction.value;
  }

  const sumExpenses = (transactions: ITransaction[]) => {
    const expenses = transactions.filter(
      (transaction) => transaction.type === 'expense'
    );
    const sum = expenses.reduce(reducer, 0);
    setFinancialData((data) => ({ ...data, totalExpenses: sum }));
  };

  const sumIncomes = (transactions: ITransaction[]) => {
    const incomes = transactions.filter(
      (transaction) => transaction.type === 'income'
    );
    const sum = incomes.reduce(reducer, 0);
    setFinancialData((data) => ({ ...data, totalIncomes: sum }));
  };

  const balance = () => {
    setFinancialData((data) => ({
      ...data,
      balanceOfTheMonth: data.totalIncomes - data.totalExpenses
    }));
  };

  useEffect(() => {
    if (!transactions.length) {
      setFinancialData({
        totalIncomes: 0,
        totalExpenses: 0,
        balanceOfTheMonth: 0
      });

      return;
    }

    sumExpenses(transactions);
    sumIncomes(transactions);
    balance();
  }, [transactions]);

  return {
    totalIncomes: financialData.totalIncomes,
    totalExpenses: financialData.totalExpenses,
    balanceOfTheMonth: financialData.balanceOfTheMonth
  };
}
