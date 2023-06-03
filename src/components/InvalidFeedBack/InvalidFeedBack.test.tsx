import { render, screen } from 'utils/test-utils';

import InvalidFeedBack from '.';

describe('<InvalidFeedBack />', () => {
  const errorMessage = 'Essa é um teste de error';
  it('should render the message', () => {
    const { container } = render(<InvalidFeedBack message={errorMessage} />);

    const message = screen.getByText(/essa é um teste de error/i);

    expect(message).toBeInTheDocument();
    expect(message).toHaveStyle({ color: '#D14343' });
    expect(container.firstChild).toMatchSnapshot();
  });
});
