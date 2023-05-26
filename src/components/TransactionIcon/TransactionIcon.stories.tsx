import { ComponentMeta, ComponentStory } from '@storybook/react'
import { ThemeProvider } from 'styled-components';

import TransactionIcon from '.'
import theme from '../../styles/theme';

export default {
  title: 'TransactionIcon',
  component: TransactionIcon
} as ComponentMeta<typeof TransactionIcon>

export const Basic: ComponentStory<typeof TransactionIcon> = () => (
  <ThemeProvider theme={theme}>
    <TransactionIcon />
  </ThemeProvider>
)
