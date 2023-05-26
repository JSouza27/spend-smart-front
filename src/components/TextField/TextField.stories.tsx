import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import TextField from '.';
import theme from '../../styles/theme';
import { FormProvider, useForm } from 'react-hook-form';

export default {
  title: 'TextField',
  component: TextField,
  args: {
    label: 'Description',
    name: 'description'
  }
} as ComponentMeta<typeof TextField>;

const schema = z.object({
  description: z.string().max(3, 'Erro nesse input')
});

type SchemaFormValues = z.infer<typeof schema>;

export const Basic: ComponentStory<typeof TextField> = (args) => {
  const methods = useForm();

  return (
    <ThemeProvider theme={theme}>
      <FormProvider {...methods}>
        <TextField {...args} />
      </FormProvider>
    </ThemeProvider>
  );
};

export const Disabled: ComponentStory<typeof TextField> = (args) => {
  const methods = useForm();

  return (
    <ThemeProvider theme={theme}>
      <FormProvider {...methods}>
        <TextField disabled value="Estou desabilitado" {...args} />
      </FormProvider>
    </ThemeProvider>
  );
};
