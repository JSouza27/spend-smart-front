export default interface IUserEntity {
  id: string;
  name: string;
  email: string;
  imageUrl: string | null;
  additional_user_email: string | null;
  account_id: string;
  nick: string;
}
