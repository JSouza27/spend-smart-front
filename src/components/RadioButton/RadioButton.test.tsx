import { fireEvent, render, screen } from 'utils/test-utils';

import RadioButton from '.';

describe('<RadioButton />', () => {
  it('should render the radio button', () => {
    const { container } = render(
      <RadioButton label="Receita" name="type" value="income" id="income" />
    );

    const label = screen.getByRole('radio', {
      name: /receita/i
    });
    const input = screen.getByRole('radio', {
      name: /receita/i
    });

    fireEvent.click(input);

    expect(label).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(input).toHaveProperty('checked', true);
  });
});
