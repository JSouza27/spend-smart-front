import { GoogleAuthProvider, UserCredential } from 'firebase/auth';

import IUserEntity from './userEntity';
import { FirebaseError } from 'firebase/app';
import { AccountService } from '../accounts/accountService';
import IAuthenticationRepository from '../../shared/interface/IAuthenticationRepository';
import { arrayUnion } from 'firebase/firestore';

export class UserService {
  private authRepository: IAuthenticationRepository;
  private accountService: AccountService;

  constructor(
    authRepository: IAuthenticationRepository,
    accountService: AccountService
  ) {
    this.authRepository = authRepository;
    this.accountService = accountService;
  }

  private createNick(name: string): string {
    const arrName = name.split(' ');
    const firstLetter = arrName[0].substring(0, 1);

    return `${firstLetter}`;
  }

  async createUser(
    credential: UserCredential,
    path: string,
    token: string,
    account_id: string
  ): Promise<any> {
    try {
      const user: IUserEntity = {
        id: credential.user.uid,
        name: credential.user.displayName!,
        email: credential.user.email!,
        imageUrl: credential.user.photoURL,
        nick: this.createNick(credential.user.displayName!),
        additional_user_email: null,
        account_id: account_id
      };

      await this.authRepository.createUser(user, path);

      return {
        user,
        token
      };
    } catch (e: any) {
      throw new Error(`Erro ao cadastrar o usuário: ${e}`);
    }
  }

  async getUserByEmail(email: string): Promise<IUserEntity | null> {
    try {
      return this.authRepository.getUserByEmail('users', email!);
    } catch (e: any) {
      throw new Error(`Erro ao buscar o usuário: ${e}`);
    }
  }

  async createUserLink(
    email: string,
    data: { token: string }
  ): Promise<{ message: string; status: boolean }> {
    try {
      const path = 'user_links';
      await this.authRepository.createUserLink(email, data, path);

      return {
        message: 'Documento criado com sucesso',
        status: true
      };
    } catch (e: any) {
      throw new Error(`Erro ao buscar o usuário: ${e}`);
    }
  }

  async updateUser(
    data: IUserEntity,
    email: string
  ): Promise<{ message: string; status: boolean }> {
    try {
      const path = `users/${email}`;
      await this.authRepository.updateUser(path, data);

      return {
        message: 'Documento atualizado com sucesso',
        status: true
      };
    } catch (e: any) {
      throw new Error(`Erro ao atualizar o usuário: ${e}`);
    }
  }

  async loginGoogle(): Promise<{ user: IUserEntity; token: string } | null> {
    try {
      const credential = await this.authRepository.loginGoogle();
      const email = credential.user.email;
      const token = await credential.user.getIdToken();
      const user = await this.getUserByEmail(email!);
      if (!user) {
        const account = await this.accountService.create(credential.user.uid);

        const doc = await this.createUser(
          credential,
          'users',
          token,
          account.account_id
        );
        return doc;
      }

      return {
        user,
        token
      };
    } catch (error: any) {
      if (error instanceof FirebaseError) {
        const errorCode = error.code;
        const errorMessage = error.message;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.error({ errorCode, errorMessage, credential });
        console.error(error);
        return null;
      }

      throw new Error(
        `Ocorreu um erro na tentativa de logar o usuário: ${error}`
      );
    }
  }

  async logout(): Promise<any> {
    try {
      return this.authRepository.logout();
    } catch (error: any) {
      if (error.code === 'auth/cancelled-popup-request') {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.error({ errorCode, errorMessage, email, credential });
        console.error(error);
        return null;
      } else {
        throw new Error(`Ocorreu um erro ao sair da aplicação: ${error}`);
      }
    }
  }

  async linkUser(data: {
    accountId: string;
    email: string;
    token: string;
  }): Promise<{ user: IUserEntity; token: string } | null> {
    try {
      const credential = await this.authRepository.loginGoogle();
      const credencialToken = await credential.user.getIdToken();

      const validationToken = await this.authRepository.getUserByEmail(
        'user_links',
        data.email
      );

      if (validationToken.token !== data.token) {
        throw new Error('Token inválido, gere um novo link!');
      }

      await this.accountService.update(data.accountId, {
        owners: arrayUnion(credential.user.uid)
      });

      const doc = await this.createUser(
        credential,
        'users',
        credencialToken,
        data.accountId
      );

      return doc;
    } catch (e: any) {
      throw new Error(`Ocorreu um erro na tentativa de logar o usuário: ${e}`);
    }
  }
}
