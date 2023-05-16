import { Plus } from '@styled-icons/bootstrap';

import { render, screen } from 'utils/test-utils';
import Button from '.';

describe('<Button />', () => {
  it('should render the medium size by default', () => {
    const { container } = render(<Button>Nova Transição</Button>);

    const button = screen.getByRole('button', { name: /nova transição/i });

    expect(button).toBeInTheDocument();
    expect(button).toHaveStyle({
      height: '3.2rem',
      'font-size': '1.2rem',
      padding: '0.8rem 1.6rem'
    });
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render the small size', () => {
    render(<Button size="small">Nova Transição</Button>);

    const button = screen.getByRole('button', { name: /nova transição/i });

    expect(button).toBeInTheDocument();
    expect(button).toHaveStyle({
      height: '2.4rem',
      'font-size': '1.2rem',
      padding: '0.4rem 1.2rem'
    });
  });

  it('should render the large size', () => {
    render(<Button size="large">Nova Transição</Button>);

    const button = screen.getByRole('button', { name: /nova transição/i });

    expect(button).toBeInTheDocument();
    expect(button).toHaveStyle({
      height: '4rem',
      'font-size': '1.4rem',
      padding: '1.2rem 2.4rem'
    });
  });

  it('should render an icon version', () => {
    render(
      <Button icon={<Plus data-testid="icon" />} size="medium">
        Nova Transição
      </Button>
    );

    const button = screen.getByText(/nova transição/i);
    const icon = screen.getByTestId(/icon/i);

    expect(button).toBeInTheDocument();
    expect(icon).toBeInTheDocument();
  });

  it('should render an icon version', () => {
    render(
      <Button icon={<Plus data-testid="icon" />} size="medium">
        Nova Transição
      </Button>
    );

    const button = screen.getByText(/nova transição/i);
    const icon = screen.getByTestId(/icon/i);

    expect(button).toBeInTheDocument();
    expect(icon).toBeInTheDocument();
  });
});
