import { UserCredential } from 'firebase/auth';
import IUserEntity from '../../modules/users/userEntity';

export default interface IAuthenticationRepository {
  loginGoogle(): Promise<UserCredential>;
  createUser(data: any, url: string): Promise<boolean>;
  getUserByEmail(url: string, email: string): Promise<any>;
  createUserLink(email: string, data: any, path: string): Promise<boolean>;
  getAll(url: string): Promise<any>;
  updateUser(path: string, data: any): Promise<any>;
  logout(): Promise<void>;
}
