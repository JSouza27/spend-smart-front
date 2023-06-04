import { IUser } from '../../common/interfaces/user';
import Heading from '../Heading';
import UserMenu from '../UserMenu';
import * as S from './styles';

export type HeaderProps = {
  user: IUser | null;
};

export default function Header({ user }: HeaderProps) {
  return (
    <S.Wrapper>
      <S.Limit>
        <Heading className="salutation" level={1} size="xxlarge">
          Olá {!!user && user.name.split(' ')[0]}
        </Heading>

        <UserMenu />
      </S.Limit>
    </S.Wrapper>
  );
}
