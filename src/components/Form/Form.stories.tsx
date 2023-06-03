import { ComponentMeta, ComponentStory } from '@storybook/react'
import { ThemeProvider } from 'styled-components';

import Form from '.'
import theme from '../../styles/theme';

export default {
  title: 'Form',
  component: Form
} as ComponentMeta<typeof Form>

export const Basic: ComponentStory<typeof Form> = () => (
  <ThemeProvider theme={theme}>
    <Form />
  </ThemeProvider>
)
