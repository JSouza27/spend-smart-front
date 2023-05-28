import { fireEvent, render, screen } from 'utils/test-utils';
import userEvent from '@testing-library/user-event';

import ModalNewTransaction from '.';
import {
  TransactionContext,
  TransactionProvider
} from '../../contexts/transaction';

describe('<ModalNewTransaction />', () => {
  const user = userEvent.setup();

  let showModal = true;
  let onClose = jest.fn();

  it('should render the form in the modal', () => {
    const { container } = render(
      <ModalNewTransaction showModal={showModal} onClose={onClose} />
    );

    const heading = screen.getByRole('heading', {
      name: /adicionar nova transação/i
    });
    const btnClose = screen.getByRole('button', {
      name: /x/i
    });
    const descriptionLabel = screen.getByText(/descrição/i);
    const descriptionInput = screen.getByRole('textbox', {
      name: /descrição/i
    });
    const valueLabel = screen.getByRole('textbox', {
      name: /descrição/i
    });
    const ValueInput = screen.getByRole('textbox', {
      name: /valor/i
    });
    const incomeLabel = screen.getByText(/receita/i);
    const incomeRadio = screen.getByRole('radio', {
      name: /receita/i
    });
    const expenseLabel = screen.getByText(/despesa/i);
    const expenseRadio = screen.getByRole('radio', {
      name: /despesa/i
    });
    const btnSave = screen.getByRole('button', {
      name: /salvar/i
    });
    const btnCancel = screen.getByRole('button', {
      name: /cancelar/i
    });

    expect(heading).toBeInTheDocument();
    expect(btnClose).toBeInTheDocument();
    expect(descriptionLabel).toBeInTheDocument();
    expect(descriptionInput).toBeInTheDocument();
    expect(valueLabel).toBeInTheDocument();
    expect(ValueInput).toBeInTheDocument();
    expect(incomeLabel).toBeInTheDocument();
    expect(incomeRadio).toBeInTheDocument();
    expect(expenseLabel).toBeInTheDocument();
    expect(expenseRadio).toBeInTheDocument();
    expect(btnSave).toBeInTheDocument();
    expect(btnCancel).toBeInTheDocument();
  });

  it('should send the form', async () => {
    const transactionProviderProps = {
      saveTransaction: jest.fn(),
      transactions: [],
      deleteTransaction: jest.fn(),
      getTransactionsPerMonth: jest.fn(),
      updateTransaction: jest.fn(),
      isEdit: false,
      setIsEdit: jest.fn(),
      setDate: jest.fn(),
      date: new Date(2023, 5, 26)
    };

    render(
      <TransactionContext.Provider value={transactionProviderProps}>
        <ModalNewTransaction showModal={showModal} onClose={onClose} />
      </TransactionContext.Provider>
    );

    fireEvent.change(screen.getByLabelText('Descrição'), {
      target: { value: 'Test transaction' }
    });
    fireEvent.change(screen.getByLabelText('Valor'), {
      target: { value: '10.00' }
    });
    fireEvent.click(screen.getByLabelText('Receita'));
    fireEvent.change(screen.getByTestId('date-input'), {
      target: { value: '2023-05-26' }
    });

    const btnSave = screen.getByRole('button', {
      name: /salvar/i
    });

    await user.click(btnSave);

    expect(transactionProviderProps.saveTransaction).toHaveBeenCalled();
    expect(transactionProviderProps.saveTransaction).toHaveBeenCalledWith({
      description: 'Test transaction',
      value: 10.0,
      type: 'income',
      invoiceDueDate: new Date(2023, 4, 26)
    });
  });

  it('should send update', async () => {
    const transactionProviderProps = {
      saveTransaction: jest.fn(),
      transactions: [],
      deleteTransaction: jest.fn(),
      getTransactionsPerMonth: jest.fn(),
      updateTransaction: jest.fn(),
      isEdit: true,
      setIsEdit: jest.fn(),
      setDate: jest.fn(),
      date: new Date(2023, 5, 26)
    };

    render(
      <TransactionContext.Provider value={transactionProviderProps}>
        <ModalNewTransaction showModal={showModal} onClose={onClose} />
      </TransactionContext.Provider>
    );

    fireEvent.change(screen.getByLabelText('Descrição'), {
      target: { value: 'Test transaction' }
    });
    fireEvent.change(screen.getByLabelText('Valor'), {
      target: { value: '100.00' }
    });
    fireEvent.click(screen.getByLabelText('Receita'));

    const btnSave = screen.getByRole('button', {
      name: /salvar/i
    });

    await user.click(btnSave);

    expect(transactionProviderProps.updateTransaction).toHaveBeenCalled();
  });
});
