import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ThemeProvider } from 'styled-components';

import Card from '.';
import theme from '../../styles/theme';

export default {
  title: 'Card',
  component: Card
} as ComponentMeta<typeof Card>;

export const Basic: ComponentStory<typeof Card> = (args) => (
  <ThemeProvider theme={theme}>
    <Card {...args} />
  </ThemeProvider>
);
