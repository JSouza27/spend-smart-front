import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ThemeProvider } from 'styled-components';

import InvalidFeedBack from '.';
import theme from '../../styles/theme';

export default {
  title: 'InvalidFeedBack',
  component: InvalidFeedBack,
  args: {
    message: 'Mensagem de error...'
  }
} as ComponentMeta<typeof InvalidFeedBack>;

export const Basic: ComponentStory<typeof InvalidFeedBack> = (args) => (
  <ThemeProvider theme={theme}>
    <InvalidFeedBack {...args} />
  </ThemeProvider>
);
