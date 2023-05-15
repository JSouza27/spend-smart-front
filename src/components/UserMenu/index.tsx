import Image from 'next/image';

import Heading from '../Heading';
import user from 'data/constants/mockUsuario';
import * as S from './styles';

export default function UserMenu() {
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
            width={500}
            height={500}
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
