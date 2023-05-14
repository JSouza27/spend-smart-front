import { v4 as uuid } from 'uuid';

export default class CreateId {
  static newId(): string {
    return uuid();
  }
}
