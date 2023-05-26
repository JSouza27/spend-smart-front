import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ThemeProvider } from 'styled-components';

import ModalNewTransaction from '.';
import theme from '../../styles/theme';

export default {
  title: 'ModalNewTransaction',
  component: ModalNewTransaction,
  args: {
    showModal: true,
    onClose() {
      this.showModal = false;
    }
  }
} as ComponentMeta<typeof ModalNewTransaction>;

export const Basic: ComponentStory<typeof ModalNewTransaction> = (args) => {
  return (
    <ThemeProvider theme={theme}>
      <ModalNewTransaction {...args} />
    </ThemeProvider>
  );
};
