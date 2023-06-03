import { render, screen } from 'utils/test-utils';

import Table from '.';
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

describe('<Table />', () => {
  it('should render the Table', () => {
    const { container } = render(<Table columns={columns} data={row} />);

    const table = screen.getByRole('table');

    expect(table).toBeInTheDocument();
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render the header', () => {
    render(<Table columns={columns} data={row} />);

    const description = screen.getByText(/descrição/i);
    const date = screen.getByText(/data de vencimento/i);
    const value = screen.getByText(/valor/i);

    expect(description).toBeInTheDocument();
    expect(date).toBeInTheDocument();
    expect(value).toBeInTheDocument();
  });

  it('should render the line', () => {
    render(<Table columns={columns} data={row} />);

    const description = screen.getByText(/conta de luz/i);
    const date = screen.getByText(/03\/05\/2023/i);
    const value = screen.getByText(/r\$ 255,70/i);

    expect(description).toBeInTheDocument();
    expect(date).toBeInTheDocument();
    expect(value).toBeInTheDocument();
  });
});
