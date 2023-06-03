import Button from '../../components/Button';
import Heading from '../../components/Heading';
import { useAuthentication } from '../../contexts/auth';
import Base from '../Base';
import * as S from './styles';

export default function LinkUser() {
  const { linkUser } = useAuthentication();

  return (
    <Base>
      <S.Wrapper>
        <S.Container>
          <Heading level={1} size="medium">
            Faça login na sua conta SpendSmart
          </Heading>
          <Button
            type="button"
            appearance="secondary"
            fullWidth
            onClick={linkUser}
          >
            Continuar com o Google
          </Button>
        </S.Container>
      </S.Wrapper>
    </Base>
  );
}
