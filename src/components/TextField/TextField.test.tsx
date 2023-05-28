import { fireEvent, render, screen } from 'utils/test-utils';

import TextField from '.';

describe('<TextField />', () => {
  it('should render the TextField', () => {
    const { container } = render(
      <TextField label="Descrição" name="description" type="text" />
    );

    const label = screen.getByRole('textbox', {
      name: /descrição/i
    });
    const input = screen.getByRole('textbox', {
      name: /descrição/i
    });

    fireEvent.change(input, {
      target: { value: 'Test transaction' }
    });

    expect(label).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(input).toHaveProperty('value', 'Test transaction');
    expect(container.firstChild).toMatchSnapshot();
  });
});
