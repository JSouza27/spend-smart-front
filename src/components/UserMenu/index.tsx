import Image from 'next/image';
import Link from 'next/link';
import { DocumentTextExtract } from '@styled-icons/fluentui-system-filled';
import { User, Exit } from '@styled-icons/boxicons-regular';

import Heading from '../Heading';
import * as S from './styles';
import Dropdown from '../Dropdown';
import { IUser } from '../../common/interfaces/user';
import { useAuthentication } from '../../contexts/auth';

export type TriggerProps = {
  user: IUser;
};

function Trigger({ user }: TriggerProps) {
  return (
    <S.Wrapper>
      <S.UserContainer>
        <Heading level={2} size="medium" lineHeight="2.4rem">
          {user.name}
        </Heading>
        <span>{user.email}</span>
      </S.UserContainer>
      <S.Avatar>
        {user.imageUrl ? (
          <Image
            src={user.imageUrl}
            width={50}
            height={50}
            alt="Picture of the author"
          />
        ) : (
          <Heading
            level={1}
            size="xlarge"
            color="neutral_800"
            lineHeight="2.4rem"
          >
            {user.nick}
          </Heading>
        )}
      </S.Avatar>
    </S.Wrapper>
  );
}

export default function UserMenu() {
  const { user, logout } = useAuthentication();

  return (
    <>
      {user && (
        <Dropdown trigger={<Trigger user={user} />}>
          <S.Nav>
            <S.Title>
              <Heading
                level={1}
                size="xsmall"
                color="neutral_600"
                lineHeight={'1.6rem'}
              >
                Usuário
              </Heading>
            </S.Title>
            <Link href="/extrato" passHref>
              <S.Link>
                <DocumentTextExtract size={16} />
                <span>Extrato</span>
              </S.Link>
            </Link>
            <Link href="/profile" passHref>
              <S.Link>
                <User size={16} />
                <span>Meus Dados</span>
              </S.Link>
            </Link>
            <Link href="/" passHref onClick={logout}>
              <S.Link>
                <Exit size={16} />
                <span>Sair</span>
              </S.Link>
            </Link>
          </S.Nav>
        </Dropdown>
      )}
    </>
  );
}
