import {
  collection,
  addDoc,
  getFirestore,
  getDocs,
  DocumentData,
  query,
  where,
  doc,
  updateDoc,
  deleteDoc
} from 'firebase/firestore';

import { app } from '../config/app';
import { IFilter } from '../../../shared/interfaces/Filters';
import { ICollection } from '../../../shared/interfaces/Collections';

export class Collection implements ICollection {
  async save(url: string, data: any): Promise<string> {
    const db = getFirestore(app);
    const docRef = await addDoc(collection(db, url), data);

    return docRef.id;
  }

  async findAll(url: string): Promise<DocumentData[]> {
    const db = getFirestore(app);
    const querySnapshot = await getDocs(collection(db, url));
    const docs: DocumentData[] = [];
    querySnapshot.forEach((doc) => docs.push({ ...doc.data(), id: doc.id }));

    return docs;
  }

  async findWithFilters(
    url: string,
    filters: IFilter[]
  ): Promise<DocumentData[]> {
    const db = getFirestore(app);
    const collectionRef = collection(db, url);

    const filteWithWhere =
      filters.map(({ attribute, op, value }) => where(attribute, op, value)) ??
      [];
    const q = query(collectionRef, ...filteWithWhere);

    const querySnapshot = await getDocs(q);
    const docs: DocumentData[] = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));

    return docs;
  }

  async update(url: string, data: any): Promise<string> {
    const db = getFirestore(app);
    const docRef = doc(db, url, data.id);

    delete data['id'];
    await updateDoc(docRef, data);

    return 'Documento atualizado com sucesso!';
  }

  async delete(url: string, id: string): Promise<string> {
    const db = getFirestore(app);
    await deleteDoc(doc(db, url, id));

    return 'Documento removido com sucesso!';
  }
}
