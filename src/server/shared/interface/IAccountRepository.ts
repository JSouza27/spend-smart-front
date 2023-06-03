import { IAccountEntity } from '../../modules/accounts/accoutEntity';

export default interface IAccountRepository {
  create(
    path: string,
    data: IAccountEntity
  ): Promise<{ status: boolean; message: string }>;
  findAllAccount(path: string): Promise<any>;
  update(path: string, data: any): Promise<any>;
}
