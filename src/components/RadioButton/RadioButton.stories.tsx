import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import { FormProvider, useForm } from 'react-hook-form';

import RadioButton from '.';
import theme from '../../styles/theme';

export default {
  title: 'RadioButton',
  component: RadioButton,
  args: {
    label: 'Receita',
    name: 'income'
  }
} as ComponentMeta<typeof RadioButton>;

export const Basic: ComponentStory<typeof RadioButton> = (args) => {
  const methods = useForm();

  return (
    <ThemeProvider theme={theme}>
      <FormProvider {...methods}>
        <RadioButton {...args} />
      </FormProvider>
    </ThemeProvider>
  );
};

export const Disabled: ComponentStory<typeof RadioButton> = (args) => {
  const methods = useForm();

  return (
    <ThemeProvider theme={theme}>
      <FormProvider {...methods}>
        <RadioButton disabled {...args} />
      </FormProvider>
    </ThemeProvider>
  );
};

export const DisabledChecked: ComponentStory<typeof RadioButton> = (args) => {
  const methods = useForm();

  return (
    <ThemeProvider theme={theme}>
      <FormProvider {...methods}>
        <RadioButton disabled checked {...args} />
      </FormProvider>
    </ThemeProvider>
  );
};
