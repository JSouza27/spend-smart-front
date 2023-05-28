import { ComponentMeta, Story } from '@storybook/react'
import { ThemeProvider } from 'styled-components';

import Header from '.'
import theme from '../../styles/theme';

export default {
  title: 'Header',
  component: Header
} as ComponentMeta

export const Basic: Story = () => (
  <ThemeProvider theme={theme}>
    <Header />
  </ThemeProvider>
)
