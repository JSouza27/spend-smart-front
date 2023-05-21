import React from 'react';

import Extract from '../Templates/Extract';
import { TableColumn } from 'react-data-table-component';
import { CurrencyFormatter } from '../utils/currencyFormatter';
import mockUsuario from '../data/constants/mockUsuario';
import { TransitionsService } from '../server/modules/transitions/transitionsServive';

export type DataRow = {
  description: string;
  invoiceDueDate: string;
  value: string;
  type: string;
};

export default function extrato({ transitions }) {
  const data: DataRow[] = React.useMemo(
    () => [
      {
        description: 'Conta de Luz',
        invoiceDueDate: '03/05/2023',
        value: CurrencyFormatter.formatter(255.7),
        type: 'expense',
        sortable: true
      },
      {
        description: 'Cartão Renner',
        invoiceDueDate: '25/05/2023',
        value: CurrencyFormatter.formatter(908.16),
        type: 'expense',
        sortable: true
      },
      {
        description: 'Pagamento - Jonathan',
        invoiceDueDate: '08/05/2023',
        value: CurrencyFormatter.formatter(2713.0),
        type: 'income',
        sortable: true
      }
    ],
    []
  );

  const columns: TableColumn<DataRow>[] = React.useMemo(
    () => [
      { name: 'Descrição', selector: (row) => row.description },
      { name: 'Data de Vencimento', selector: (row) => row.invoiceDueDate },
      { name: 'Valor', selector: (row) => row.value }
    ],
    []
  );

  const props = {
    totalIncomes: 0,
    totalExpenses: 0,
    balanceOfTheMonth: 0,
    columns,
    rows: transitions
  };

  return <Extract {...props} />;
}

export async function getServerSideProps() {
  const service = new TransitionsService();
  const user = mockUsuario;
  const transitions = await service.findAll(user);

  console.log(transitions);
  return { props: { transitions } };
}
