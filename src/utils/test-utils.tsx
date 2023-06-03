import { render } from '@testing-library/react';
import React from 'react';
import { ThemeProvider } from 'styled-components';

import theme from '../styles/theme';
import { FormProvider, useForm } from 'react-hook-form';

const AllTheProviders = ({ children }: any) => {
  const methods = useForm();

  return (
    <ThemeProvider theme={theme}>
      <FormProvider {...methods}>{children}</FormProvider>
    </ThemeProvider>
  );
};

const customRender = (
  ui: React.ReactElement<any, string | React.JSXElementConstructor<any>>,
  options?: any
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
