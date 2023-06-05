import React, { useState, Suspense } from 'react';
import { format, parse } from 'date-fns';
import { Edit } from '@styled-icons/fluentui-system-filled';
import { Trash } from '@styled-icons/boxicons-regular';
import { TableColumn } from 'react-data-table-component';
import Swal from 'sweetalert2';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createPortal } from 'react-dom';
import * as z from 'zod';

import ExtractTemplate from '../Templates/Extract';
import { CurrencyFormatter } from '../utils/currencyFormatter';
import { useTransaction } from '../contexts/transaction';
import TransactionIcon from '../components/TransactionIcon';
import Button from '../components/Button';
import { useReducerTransactionValues } from '../hooks/reducerTransactionValues';
import ModalNewTransaction from '../components/ModalNewTransaction';
import theme from '../styles/theme';
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';

export type DataRow = {
  id: string;
  description: string;
  invoiceDueDate: string;
  value: string;
  type: 'income' | 'expense';
};

const transactionSchema = z.object({
  id: z.optional(z.string()),
  description: z.string().nonempty('A descrição é obrigatória.'),
  value: z.string().nonempty('É necessário adicionar um valor.'),
  invoiceDueDate: z
    .date({
      required_error: 'É necessário adicionar a data de vencimento.'
    })
    .or(
      z.string({
        required_error: 'É necessário adicionar a data de vencimento.'
      })
    ),
  type: z.enum(['income', 'expense'], {
    required_error: 'É necessário dizer se é uma despesa ou reita.'
  })
});

export type stateProps = z.infer<typeof transactionSchema>;

export default function Extrato() {
  const [showModal, setShowModal] = useState(false);

  const { transactions, setIsEdit, deleteTransaction } = useTransaction();
  const { balanceOfTheMonth, totalExpenses, totalIncomes } =
    useReducerTransactionValues();
  const methods = useForm<stateProps>({
    resolver: zodResolver(transactionSchema)
  });

  const handleEditTransaction = (id: string) => {
    methods.reset();

    const transaction = transactions.find(
      (transaction) => transaction.id === id
    );

    if (!transaction || transaction === undefined) {
      Swal.fire({
        title: 'Error!',
        text: 'Erro ao editar a transação',
        icon: 'error',
        confirmButtonText: 'Ok',
        buttonsStyling: false,
        customClass: {
          title: 'swal-title',
          htmlContainer: 'swal-html-container',
          popup: 'swal-popup',
          confirmButton: 'swal-confirm-button',
          cancelButton: 'swal-cancel-button',
          actions: 'swal-action'
        }
      });

      return;
    }

    setIsEdit(true);
    const dateString = transaction.invoiceDueDate;
    const dateObject = parse(dateString, 'dd/MM/yyyy', new Date());
    const formattedDate = format(dateObject, 'yyyy-MM-dd');

    methods.setValue('id', transaction.id);
    methods.setValue('description', transaction.description);
    methods.setValue('invoiceDueDate', formattedDate);
    methods.setValue('type', transaction.type);
    methods.setValue('value', transaction.value.toString());

    setShowModal(true);
  };

  const handleDeleteTransaction = async (id: string) => {
    Swal.fire({
      title: 'Cuidado',
      text: 'Tem certeza que deseja remover a transação?',
      icon: 'warning',
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
      showCancelButton: true,
      buttonsStyling: false,
      reverseButtons: true,
      customClass: {
        title: 'swal-title',
        htmlContainer: 'swal-html-container',
        popup: 'swal-popup',
        confirmButton: 'swal-confirm-button',
        cancelButton: 'swal-cancel-button',
        actions: 'swal-action'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        deleteTransaction(id);
      }
    });
  };

  const handleModalChange = () => {
    methods.reset();
    setShowModal(!showModal);
  };

  const columns: TableColumn<DataRow>[] = React.useMemo(
    () => [
      {
        name: '',
        width: '8.6rem',
        cell: (row) => <TransactionIcon type={row.type} />
      },
      {
        name: 'Descrição',
        selector: (row) => row.description
      },
      {
        name: 'Data de Vencimento',
        sortable: true,
        cell: (row) => row.invoiceDueDate
      },
      { name: 'Valor', sortable: true, selector: (row) => row.value },
      {
        name: 'Ações',
        cell: (row) => (
          <>
            <Button
              size="small"
              appearance="minimal"
              icon={<Edit />}
              onClick={() => handleEditTransaction(row.id)}
            />
            <Button
              className="btn-trash"
              size="small"
              appearance="minimal"
              icon={<Trash color={theme.colors.red_400} />}
              onClick={() => handleDeleteTransaction(row.id)}
            />
          </>
        )
      }
    ],
    [transactions]
  );

  const props = {
    totalIncomes,
    totalExpenses,
    balanceOfTheMonth,
    columns,
    showModal,
    handleModalChange,
    rows: transactions.map((transaction) => ({
      ...transaction,
      value: CurrencyFormatter.formatter(transaction.value)
    }))
  };

  return (
    <FormProvider {...methods}>
      <ExtractTemplate {...props} />
      {showModal &&
        createPortal(
          <ModalNewTransaction
            onClose={() => setShowModal(false)}
            showModal={showModal}
          />,
          document.body
        )}
    </FormProvider>
  );
}
