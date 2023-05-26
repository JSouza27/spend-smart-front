import { render, screen } from 'utils/test-utils';

import TransactionIcon from '.';

describe('<TransactionIcon />', () => {
  it('should have the color #D14343', () => {
    const { container } = render(<TransactionIcon type="expense" />);

    const icon = screen.getByTestId('arrow-icon');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveStyle('background-color: #D14343');
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should have the color #52BD94', () => {
    const { container } = render(<TransactionIcon type="income" />);

    const icon = screen.getByTestId('arrow-icon');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveStyle('background-color: #52BD94');
    expect(container.firstChild).toMatchSnapshot();
  });
});
