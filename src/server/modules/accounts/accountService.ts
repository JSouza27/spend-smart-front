import IAccountRepository from '../../shared/interface/IAccountRepository';
import { IAccountEntity } from './accoutEntity';

export class AccountService {
  private accountRepository: IAccountRepository;

  constructor(accountRepository: IAccountRepository) {
    this.accountRepository = accountRepository;
  }

  async findAllAccount(path: string): Promise<IAccountEntity[]> {
    try {
      const accounts = await this.accountRepository.findAllAccount(path);

      return accounts;
    } catch (error) {
      throw new Error(`Ocorreu um erro ao buscar as contas: ${error}`);
    }
  }

  async create(user_id: string): Promise<IAccountEntity> {
    try {
      const path = 'accounts';
      const accounts = await this.findAllAccount(path);

      let accountNumber = 5000;

      if (accounts.length) {
        const lastAccount = accounts[accounts.length - 1].account_id;
        accountNumber = Number(lastAccount) + 1;
      }

      const account = {
        account_id: accountNumber.toString(),
        owners: [user_id]
      };

      await this.accountRepository.create(path, account);

      return account;
    } catch (error) {
      throw new Error(`Ocorreu um erro ao criar a conta: ${error}`);
    }
  }

  async update(accountId: string, data: any) {
    try {
      const path = `accounts/${accountId}`;
      await this.accountRepository.update(path, data);

      return {
        message: 'Documento atualizado com sucesso',
        status: true
      };
    } catch (e: any) {
      throw new Error(
        'Ocorreu um erro na tentativa de atualizar uma transação.'
      );
    }
  }
}
