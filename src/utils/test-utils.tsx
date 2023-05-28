import { RenderOptions, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { ThemeProvider } from 'styled-components';

import theme from '../styles/theme';

const AllTheProviders = ({ children }: any) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

const customRender = (
  ui: React.ReactElement<any, string | React.JSXElementConstructor<any>>,
  options?: RenderOptions<
    typeof import('@testing-library/dom/types/queries'),
    HTMLElement,
    HTMLElement
  >
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
