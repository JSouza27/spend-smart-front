import { useForm, FormProvider } from 'react-hook-form';
import * as z from 'zod';

import ProfileTemplate from '../Templates/Profile';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuthentication } from '../contexts/auth';
import { useEffect } from 'react';

const profileSchame = z.object({
  id: z.string(),
  name: z.string().nonempty('É obrigatório informar o nome'),
  email: z.coerce.string().email().nonempty('E-mail é obrigatório'),
  imageUrl: z.string().nullable(),
  additional_user_email: z.string().nullable(),
  account: z.string().nonempty('O numero da conta é obrigatório'),
  nick: z.string()
});

export type UserProps = z.infer<typeof profileSchame>;

export default function Profile() {
  const { user } = useAuthentication();
  const methods = useForm<UserProps>({
    resolver: zodResolver(profileSchame)
  });

  const { setValue } = methods;

  useEffect(() => {
    if (user) {
      setValue('id', user.id);
      setValue('name', user.name);
      setValue('email', user.email);
      setValue('imageUrl', user.imageUrl);
      setValue('additional_user_email', user.additional_user_email);
      setValue('nick', user.nick);
    }
  }, [user]);

  return (
    <FormProvider {...methods}>
      <ProfileTemplate nick={user?.nick} imageUrl={user?.imageUrl} />
    </FormProvider>
  );
}
