import { FormProvider, useForm } from 'react-hook-form';
import * as z from 'zod';

import HomeTemplate from 'Templates/Home';
import { zodResolver } from '@hookform/resolvers/zod';

const loginSchema = z.object({
  email: z.coerce.string().email().nonempty('E-mail é obrigatório'),
  senha: z.string().nonempty('A senha é obrigatória')
});

export type LoginProps = z.infer<typeof loginSchema>;
export default function Home() {
  const methods = useForm<LoginProps>({
    resolver: zodResolver(loginSchema)
  });

  return (
    <FormProvider {...methods}>
      <HomeTemplate />
    </FormProvider>
  );
}
