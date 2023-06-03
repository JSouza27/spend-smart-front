import { render, screen } from 'utils/test-utils';

import UserMenu from '.';
import user from 'data/mocks/mockUsuario';
import { AuthContext } from '../../contexts/auth';
import mockUsuario from 'data/mocks/mockUsuario';

describe('<UserMenu />', () => {
  it('should render the heading', () => {
    const authProviderProps = {
      user: mockUsuario,
      isAuthenticated: true,
      additionalUser: jest.fn(),
      updateUser: jest.fn(),
      loginGoogle: jest.fn(),
      linkUser: jest.fn(),
      logout: jest.fn()
    };

    const { container } = render(
      <AuthContext.Provider value={authProviderProps}>
        <UserMenu />
      </AuthContext.Provider>
    );

    expect(screen.getByText(/joao gomes/i)).toBeInTheDocument();
    expect(container.firstChild).toMatchSnapshot();
  });
});
