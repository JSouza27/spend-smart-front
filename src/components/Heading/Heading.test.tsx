import { render, screen } from 'utils/test-utils';

import Heading from '.';

describe('<Heading />', () => {
  it('should render the heading', () => {
    const { container } = render(<Heading level={1}>Heading</Heading>);

    const heading = screen.getByRole('heading', {
      name: /heading/i
    });

    expect(heading).toBeInTheDocument();
    expect(container.firstChild).toMatchSnapshot();
  });
});
