import Header from '../../components/Header';
import { useAuthentication } from '../../contexts/auth';
import * as S from './styles';

export type BaseTemplateProps = {
  children: React.ReactNode;
};

export default function Base({ children }: BaseTemplateProps) {
  const { user } = useAuthentication();

  return (
    <S.Wrapper>
      <Header user={user} />
      <S.Page>{children}</S.Page>
    </S.Wrapper>
  );
}
