import { render, screen } from 'utils/test-utils';

import Header from '.';
import user from 'data/mocks/mockUsuario';

describe('<Header />', () => {
  it('should render the heading', () => {
    const { container } = render(<Header user={user} />);

    expect(screen.getByText(/olá joao/i)).toBeInTheDocument();
    expect(container.firstChild).toMatchSnapshot();
  });
});
