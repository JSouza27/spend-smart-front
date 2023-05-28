import { render, screen } from 'utils/test-utils';

import Header from '.';
import user from 'data/mocks/mockUsuario';

describe('<Header />', () => {
  it('should render the heading', () => {
    const { container } = render(<Header />);

    expect(
      screen.getByRole('heading', { name: user.name })
    ).toBeInTheDocument();
    expect(container.firstChild).toMatchSnapshot();
  });
});
