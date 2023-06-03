import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import { Plus } from '@styled-icons/bootstrap';

import Button from '.';
import theme from '../../styles/theme';
import { CSSProperties } from 'react';

export default {
  title: 'Button',
  component: Button,
  args: {
    children: 'Nova Transação',
    size: 'medium',
    appearance: 'primary'
  }
} as ComponentMeta<typeof Button>;

const styles: CSSProperties = {
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'center',
  height: '90vh',
  width: '100%'
};

export const Basic: ComponentStory<typeof Button> = (args) => (
  <ThemeProvider theme={theme}>
    <div style={styles}>
      <Button {...args} />
    </div>
  </ThemeProvider>
);

export const WithIcon: ComponentStory<typeof Button> = (args) => (
  <ThemeProvider theme={theme}>
    <div style={styles}>
      <Button icon={<Plus />} {...args} />
    </div>
  </ThemeProvider>
);

export const Appearance: ComponentStory<typeof Button> = (args) => (
  <ThemeProvider theme={theme}>
    <div style={styles}>
      <Button {...args} />
    </div>
  </ThemeProvider>
);
