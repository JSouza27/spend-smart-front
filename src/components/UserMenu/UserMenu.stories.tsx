import { ComponentMeta, Story } from '@storybook/react'
import { ThemeProvider } from 'styled-components';

import UserMenu from '.'
import theme from '../../styles/theme';

export default {
  title: 'UserMenu',
  component: UserMenu
} as ComponentMeta

export const Basic: Story = () => (
  <ThemeProvider theme={theme}>
    <UserMenu />
  </ThemeProvider>
)
