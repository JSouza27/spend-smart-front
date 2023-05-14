import CreateId from '../../server/core/common/CreateId';
import { IUser } from '../../server/core/dto/user';

export default {
  id: CreateId.newId(),
  name: 'João da Silva',
  email: 'jjjjoao@xmail.com',
  imageUrl: null,
  account: '58419-1',
  nick: 'JS'
} as IUser;
