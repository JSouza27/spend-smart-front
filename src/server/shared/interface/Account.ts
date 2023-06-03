export interface IAccount {
  create(path: string, data: any, account: string): Promise<void>;
  getLastAccount(path: string): Promise<string>;
  update(path: string, account: string): Promise<any>;
  delete(path: string, account: string): Promise<any>;
}
