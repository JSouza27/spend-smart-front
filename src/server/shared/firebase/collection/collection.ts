import {
  collection,
  addDoc,
  getFirestore,
  getDocs,
  DocumentData
} from 'firebase/firestore';

import { app } from '../config/app';
import { ITransition } from '../../interfaces/transtition';

export class Collection {
  async save(url: string, entity: Omit<ITransition, 'id'>): Promise<string> {
    try {
      const db = getFirestore(app);
      const docRef = await addDoc(collection(db, url), entity);

      return docRef.id;
    } catch (e) {
      throw new Error(`Erro ao adicionar documento: ${e}`);
    }
  }

  async findAll(url: string) {
    try {
      const db = getFirestore(app);
      const querySnapshot = await getDocs(collection(db, url));
      const docs: DocumentData[] = [];
      querySnapshot.forEach((doc) => docs.push({ ...doc.data(), id: doc.id }));

      return docs;
    } catch (e) {
      throw new Error(`Erro ao buscar todos documentos.`);
    }
  }
}
