import { render, screen } from 'utils/test-utils';

import UserMenu from '.';
import user from 'data/mocks/mockUsuario';

describe('<UserMenu />', () => {
  it('should render the heading', () => {
    const { container } = render(<UserMenu />);

    expect(
      screen.getByRole('heading', { name: user.name })
    ).toBeInTheDocument();
    expect(container.firstChild).toMatchSnapshot();
  });
});
