import { render, screen } from 'utils/test-utils';

import Form from './index';

function ElementForm() {
  return (
    <>
      <label>Label</label>
      <input type="text" />
    </>
  );
}
describe('<Form />', () => {
  it('should render the Form', () => {
    const { container } = render(
      <Form>
        <ElementForm />
      </Form>
    );
    screen.logTestingPlaygroundURL();
    const label = screen.getByText(/label/i);
    const input = screen.getByRole('textbox');

    expect(label).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(container.firstChild).toMatchSnapshot();
  });
});
