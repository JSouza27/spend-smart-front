import {
  Auth,
  GoogleAuthProvider,
  UserCredential,
  getAuth,
  signInWithPopup,
  signOut
} from 'firebase/auth';
import { app } from '../config/app';

import {
  Firestore,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  setDoc,
  updateDoc
} from 'firebase/firestore';
import IAuthenticationRepository from '../../../shared/interface/IAuthenticationRepository';

export class Authentication implements IAuthenticationRepository {
  private auth: Auth;
  private provider: GoogleAuthProvider;
  private db: Firestore;

  constructor() {
    this.auth = getAuth(app);
    this.provider = new GoogleAuthProvider();
    this.db = getFirestore(app);
  }

  async createUserLink(
    email: string,
    data: any,
    path: string
  ): Promise<boolean> {
    const docRef = doc(this.db, path, email);

    await setDoc(docRef, data);

    return true;
  }

  async createUser(data: any, url: string): Promise<boolean> {
    const docRef = doc(this.db, url, data.email);

    await setDoc(docRef, data);

    return true;
  }

  async getUserByEmail(url: string, email: string): Promise<any> {
    const collectionRef = collection(this.db, url);
    const docRef = doc(collectionRef, email);
    const docSnapshot = await getDoc(docRef);

    return docSnapshot.exists()
      ? { id: docSnapshot.id, ...docSnapshot.data() }
      : null;
  }

  async getAll(url: string): Promise<any> {
    const collectionRef = collection(this.db, url);
    const querySnapshot = await getDocs(collectionRef);
    querySnapshot.docs.forEach((doc) => console.log(doc.id));
  }

  async updateUser(path: string, data: any): Promise<any> {
    const docRef = doc(this.db, path);

    await updateDoc(docRef, data);

    return 'Documento atualizado com sucesso!';
  }

  async loginGoogle(): Promise<UserCredential> {
    const userCredential = await signInWithPopup(this.auth, this.provider);

    return userCredential;
  }

  async logout(): Promise<void> {
    return signOut(this.auth);
  }
}
