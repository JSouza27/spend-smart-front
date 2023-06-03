import Image from 'next/image';
import Base from '../Base';
import Heading from 'components/Heading';
import { useFormContext } from 'react-hook-form';

import * as S from './styles';
import Form from '../../components/Form';
import TextField from '../../components/TextField';
import Button from '../../components/Button';
import { useAuthentication } from '../../contexts/auth';
import { useState } from 'react';
import Swal from 'sweetalert2';

export type ProfileProps = {
  imageUrl?: string | null;
  nick?: string;
};

export default function Profile({ imageUrl, nick }: ProfileProps) {
  const [addNewAccount, setAddNewAccount] = useState(false);

  const { handleSubmit, getValues } = useFormContext();
  const { additionalUser } = useAuthentication();

  const inviteModal = (invite: string) => {
    Swal.fire({
      title: 'Link gerado com sucesso!',
      text: `Copie o link a seguir e enviar ao usuário que deseja cadastrar: \n${invite}`,
      icon: 'success',
      confirmButtonText: 'Ok',
      buttonsStyling: false,
      customClass: {
        title: 'swal-title',
        htmlContainer: 'swal-html-container',
        popup: 'swal-popup',
        confirmButton: 'swal-confirm-button',
        cancelButton: 'swal-cancel-button',
        actions: 'swal-action'
      }
    });
  };

  const submitUser = (data: any) => {
    console.log(data);
  };

  return (
    <Base>
      <S.Container>
        <S.Avatar>
          {!imageUrl ? (
            <Heading
              level={1}
              size="xxxlarge"
              color="neutral_800"
              lineHeight="2.4rem"
            >
              {nick}
            </Heading>
          ) : (
            <Image
              src={imageUrl}
              width={150}
              height={150}
              alt="Picture of the author"
            />
          )}
        </S.Avatar>

        <Form onSubmit={handleSubmit(submitUser)}>
          <TextField label="Nome" name="name" />
          <TextField label="E-Mail" name="email" />

          <S.Fields>
            <S.Checkbox
              id="add-new-account"
              type="checkbox"
              onClick={() => setAddNewAccount(!addNewAccount)}
            />
            <label htmlFor="add-new-account">Adicionar conta</label>
          </S.Fields>
          {addNewAccount && (
            <S.AdditionalUserContainer>
              <span>
                Clique em gerar o link para criar um link e vincular um novo
                usuário a sua conta
              </span>
              <TextField
                label="E-mail adicional"
                name="additional_user_email"
              />
              <Button
                type="button"
                onClick={() =>
                  additionalUser(getValues('additional_user_email')).then(
                    (invite) => {
                      if (invite !== undefined) inviteModal(invite);
                    }
                  )
                }
              >
                Gerar link
              </Button>
            </S.AdditionalUserContainer>
          )}
          {/* <Button type="submit">Salvar</Button> */}
        </Form>
      </S.Container>
    </Base>
  );
}
