import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ThemeProvider } from 'styled-components';

import Table from '.';
import theme from '../../styles/theme';
import { CurrencyFormatter } from '../../utils/currencyFormatter';

const columns = [
  { name: 'Descrição', selector: (row: any) => row.description },
  { name: 'Data de Vencimento', selector: (row: any) => row.invoiceDueDate },
  { name: 'Valor', selector: (row: any) => row.value }
];

const row = [
  {
    description: 'Conta de Luz',
    invoiceDueDate: '03/05/2023',
    value: CurrencyFormatter.formatter(255.7),
    type: 'expense',
    sortable: true
  }
];

export default {
  title: 'Table',
  component: Table,
  args: {
    columns,
    data: row
  }
} as ComponentMeta<typeof Table>;

export const Basic: ComponentStory<typeof Table> = (args) => (
  <ThemeProvider theme={theme}>
    <Table {...args} />
  </ThemeProvider>
);
