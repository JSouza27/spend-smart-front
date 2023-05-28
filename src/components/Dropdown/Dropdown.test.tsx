import { render, screen } from 'utils/test-utils';

import Dropdown from '.';
import userEvent from '@testing-library/user-event';

describe('<Dropdown />', () => {
  const user = userEvent.setup();
  beforeEach(() => {
    const trigger = <h1 aria-label="toogle dropdown">click here</h1>;

    render(
      <Dropdown trigger={trigger}>
        <span>Conteúdo</span>
      </Dropdown>
    );
  });

  it('should render the trigger', () => {
    const trigger = screen.getByLabelText(/toogle dropdown/);

    expect(trigger).toBeInTheDocument();
  });

  it('should handle open and close dropdown', async () => {
    const trigger = screen.getByLabelText(/toogle dropdown/);
    const content = screen.getByText(/conteúdo/i).parentElement!;

    expect(content).toHaveStyle({ opacity: 0 });
    expect(content).toHaveAttribute('aria-hidden', 'true');

    await user.click(trigger);

    expect(content).toHaveStyle({ opacity: 1 });
    expect(content).toHaveAttribute('aria-hidden', 'false');
  });
});
