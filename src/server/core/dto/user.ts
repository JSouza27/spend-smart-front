export interface IUser {
  id: string;
  name: string;
  email: string;
  imageUrl: string | null;
  additional_user_id: string | null;
  cpf?: string;
  telefone?: string;
  account: string;
  nick: string;
}
