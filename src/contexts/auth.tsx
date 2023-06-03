import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { setCookie, parseCookies, destroyCookie } from 'nookies';
import { useRouter } from 'next/router';
import crypto from 'crypto';

import { IUser } from '../common/interfaces/user';
import { Authentication } from '../server/core/firebase/collection/authentication';
import { UserService } from '../server/modules/users/userService';
import { Account } from '../server/core/firebase/collection/account';
import { AccountService } from '../server/modules/accounts/accountService';
import { CustomExceptionHandler } from '../common/exception/customExceptionHandler';

type AuthContextData = {
  user: IUser | null;
  isAuthenticated: boolean;
  additionalUser: (email: string) => Promise<string | undefined>;
  updateUser: (data: IUser, email: string) => void;
  loginGoogle: () => void;
  linkUser: () => void;
  logout: () => void;
};

type ProviderProps = {
  children: React.ReactNode;
};

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
);

export function AuthProvider({ children }: ProviderProps) {
  const [user, setUser] = useState<IUser | null>(null);
  const router = useRouter();

  const isAuthenticated = !!user;

  const authCollection = new Authentication();
  const accountCollection = new Account();
  const service = new UserService(
    authCollection,
    new AccountService(accountCollection)
  );

  useEffect(() => {
    const { 'nextauth.token': token, 'nextauth.user_email': email } =
      parseCookies();

    if (token) {
      service.getUserByEmail(email).then((resp) => setUser(resp));
      router.push('extrato');
    }
  }, []);

  const generateToken = () => {
    const token = crypto.randomBytes(32).toString('hex');
    return token;
  };

  const generateInviteLink = (userId: string, token: string, email: string) => {
    const baseUrl = window.location.origin;
    const inviteLink = `${baseUrl}/link-user?accountId=${userId}&email=${email}&token=${token}`;
    return inviteLink;
  };

  const updateUser = async (data: IUser, email: string) => {
    const updatedUser = await service.updateUser(data, email);

    if (updatedUser.status === true) setUser(data);
  };

  const additionalUser = async (email: string) => {
    if (user === null) {
      const customExceptionHandler = new CustomExceptionHandler(
        'Usuário inexistente!',
        'Erro ao atualizar um documento'
      );

      customExceptionHandler.execute();
      return;
    }

    const token = generateToken();
    const inviteLink = generateInviteLink(user.account_id, token, email);

    user.additional_user_email = email;
    await updateUser(user, user.email);
    await service.createUserLink(email, { token });

    return inviteLink;
  };

  const linkUser = async () => {
    const query = router.query;

    if (!Object.keys(query).length) {
      const error = new CustomExceptionHandler(
        ' Erro ao acessar a rota!',
        'Error'
      );

      error.execute();
      return;
    }

    const { accountId, email, token } = router.query;

    const data = {
      accountId: accountId!.toString(),
      email: email!.toString(),
      token: token!.toString()
    };

    const resp = await service.linkUser(data);
    const currentDate = new Date();

    currentDate.setDate(currentDate.getDay() + 3);

    if (!resp) return;

    setCookie(undefined, 'nextauth.token', resp.token, {
      maxAge: currentDate.getTime() // 3 dias
    });
    setCookie(undefined, 'nextauth.user_email', resp.user.email, {
      maxAge: currentDate.getTime() // 3 dias
    });

    setUser(resp.user);

    router.push('extrato');
  };

  const loginGoogle = async () => {
    const resp = await service.loginGoogle();
    const currentDate = new Date();

    currentDate.setDate(currentDate.getDay() + 3);

    if (!resp) return;

    setCookie(undefined, 'nextauth.token', resp.token, {
      maxAge: currentDate.getTime() // 3 dias
    });
    setCookie(undefined, 'nextauth.user_email', resp.user.email, {
      maxAge: currentDate.getTime() // 3 dias
    });

    setUser(resp.user);

    router.push('extrato');
  };

  const logout = async () => {
    router.push('/');

    setUser(null);
    destroyCookie(undefined, 'nextauth.token');

    await service.logout();
  };

  const value = useMemo(
    () => ({
      user,
      isAuthenticated,
      updateUser,
      loginGoogle,
      logout,
      additionalUser,
      linkUser
    }),
    [user, isAuthenticated]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthentication() {
  const {
    user,
    isAuthenticated,
    updateUser,
    loginGoogle,
    logout,
    additionalUser,
    linkUser
  } = useContext(AuthContext);

  return {
    user,
    isAuthenticated,
    updateUser,
    loginGoogle,
    logout,
    additionalUser,
    linkUser
  };
}
