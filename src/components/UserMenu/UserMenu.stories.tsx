import { ComponentMeta, Story } from '@storybook/react';
import { ThemeProvider } from 'styled-components';

import UserMenu from '.';
import theme from '../../styles/theme';

export default {
  title: 'UserMenu',
  component: UserMenu
} as ComponentMeta<typeof UserMenu>;

export const Basic: Story = () => (
  <ThemeProvider theme={theme}>
    <div
      style={{ maxWidth: '98%', display: 'flex', justifyContent: 'flex-end' }}
    >
      <UserMenu />
    </div>
  </ThemeProvider>
);
