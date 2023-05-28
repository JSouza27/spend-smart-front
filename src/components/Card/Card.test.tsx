import { render, screen } from 'utils/test-utils';

import Card from '.';

describe('<Card />', () => {
  it('should render the Card', () => {
    const { container } = render(
      <Card title="Total de Receitas" type="expense" value={17354.61} />
    );

    const title = screen.getByRole('heading', {
      name: /total de receitas/i
    });
    const number = screen.getByText(/17\.354,61/i);
    const icon = screen.getByTitle('icon');

    expect(title).toBeInTheDocument();
    expect(number).toBeInTheDocument();
    expect(icon).toBeInTheDocument();
    expect(container.firstChild).toMatchSnapshot();
  });
});
