import {
  Firestore,
  collection,
  doc,
  getDocs,
  getFirestore,
  setDoc,
  updateDoc
} from 'firebase/firestore';
import { IAccountEntity } from '../../../modules/accounts/accoutEntity';
import { app } from '../config/app';
import IAccountRepository from '../../../shared/interface/IAccountRepository';

export class Account implements IAccountRepository {
  private db: Firestore;

  constructor() {
    this.db = getFirestore(app);
  }

  async findAllAccount(path: string): Promise<any> {
    const collectionRef = collection(this.db, path);
    const querySnapshot = await getDocs(collectionRef);

    return querySnapshot.empty
      ? []
      : querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          account_id: doc.id
        }));
  }
  async create(
    path: string,
    data: IAccountEntity
  ): Promise<{ status: boolean; message: string }> {
    const docRef = doc(this.db, path, data.account_id);

    await setDoc(docRef, data);

    return {
      status: true,
      message: 'Conta cadastrada com sucesso!'
    };
  }

  async update(path: string, data: any): Promise<string> {
    const docRef = doc(this.db, path);

    await updateDoc(docRef, data);

    return 'Documento atualizado com sucesso!';
  }
}
