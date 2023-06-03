import { ComponentMeta, Story } from '@storybook/react';
import { ThemeProvider } from 'styled-components';

import Header from '.';
import theme from '../../styles/theme';
import mockUsuario from '../../data/mocks/mockUsuario';

export default {
  title: 'Header',
  component: Header
} as ComponentMeta<typeof Header>;

export const Basic: Story = (args) => (
  <ThemeProvider theme={theme}>
    <Header user={mockUsuario} />
  </ThemeProvider>
);
