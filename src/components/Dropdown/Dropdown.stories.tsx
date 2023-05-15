import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ThemeProvider } from 'styled-components';

import Dropdown from '.';
import theme from '../../styles/theme';

export default {
  title: 'Dropdown',
  component: Dropdown,
  args: {
    trigger: 'Click here',
    children: 'content'
  }
} as ComponentMeta<typeof Dropdown>;

export const Basic: ComponentStory<typeof Dropdown> = (args) => (
  <ThemeProvider theme={theme}>
    <Dropdown {...args} />
  </ThemeProvider>
);
