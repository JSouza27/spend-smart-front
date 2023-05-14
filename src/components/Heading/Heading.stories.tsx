import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeProvider } from 'styled-components';

import Heading from '.';
import theme from '../../styles/theme';

export default {
  title: 'Heading',
  component: Heading,
  args: {
    color: 'neutral_900',
    fontWeight: 600,
    level: 1,
    lineHeight: '4rem',
    size: 'xxxlarge'
  }
} as ComponentMeta<typeof Heading>;

export const Default: ComponentStory<typeof Heading> = (args) => (
  <ThemeProvider theme={theme}>
    <Heading {...args}>Minhas Transações</Heading>
  </ThemeProvider>
);
