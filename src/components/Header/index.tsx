import Heading from '../Heading';
import UserMenu from '../UserMenu';
import * as S from './styles';
import user from 'data/constants/mockUsuario';

export default function Header() {
  return (
    <S.Wrapper>
      <Heading className="salutation" level={1} size="xxlarge">
        Olá {user.name.split(' ')[0]}
      </Heading>

      <UserMenu />
    </S.Wrapper>
  );
}
