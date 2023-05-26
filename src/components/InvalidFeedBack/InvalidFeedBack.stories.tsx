import { ComponentMeta, ComponentStory } from '@storybook/react'
import { ThemeProvider } from 'styled-components';

import InvalidFeedBack from '.'
import theme from '../../styles/theme';

export default {
  title: 'InvalidFeedBack',
  component: InvalidFeedBack
} as ComponentMeta<typeof InvalidFeedBack>

export const Basic: ComponentStory<typeof InvalidFeedBack> = () => (
  <ThemeProvider theme={theme}>
    <InvalidFeedBack />
  </ThemeProvider>
)
