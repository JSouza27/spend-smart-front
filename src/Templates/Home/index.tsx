import Button from '../../components/Button';
import Heading from '../../components/Heading';

import Base from '../Base';
import * as S from './styles';
import { useFormContext } from 'react-hook-form';
import { useAuthentication } from '../../contexts/auth';

export default function Home() {
  const { loginGoogle } = useAuthentication();
  const { handleSubmit } = useFormContext();

  //TODO: Falta adicionar o onSubmit e o errors
  return (
    <>
      <S.Wrapper>
        <S.Container>
          <Heading level={1} size="medium">
            Faça login na sua conta SpendSmart
          </Heading>
          <Button
            type="button"
            appearance="secondary"
            fullWidth
            onClick={loginGoogle}
          >
            Continuar com o Google
          </Button>
          {/* // TODO: próxima implementação */}
          {/* <Form onSubmit={handleSubmit(() => {})}>
            <TextField label="E-mail" name="email" />
            <TextField label="Senha" name="password" />
            <Button type="submit" fullWidth>
              Fazer login
            </Button>
          </Form>
          <span>
            Ainda não tem uma conta?{' '}
            <Link href={''} passHref>
              Cadastre-se
            </Link>
          </span> */}
        </S.Container>
      </S.Wrapper>
    </>
  );
}
