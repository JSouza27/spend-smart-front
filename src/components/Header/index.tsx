import { useRouter } from 'next/router';
import { IUser } from '../../common/interfaces/user';
import Heading from '../Heading';
import UserMenu from '../UserMenu';
import * as S from './styles';

export type HeaderProps = {
  user: IUser | null;
};

export default function Header({ user }: HeaderProps) {
  const router = useRouter();

  return (
    <S.Wrapper isAuthenticated={!!user && router.asPath !== '/'}>
      <Heading className="salutation" level={1} size="xxlarge">
        Olá {!!user && user.name.split(' ')[0]}
      </Heading>

      <UserMenu />
    </S.Wrapper>
  );
}
