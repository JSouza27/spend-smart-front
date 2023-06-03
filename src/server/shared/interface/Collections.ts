import { DocumentData } from 'firebase/firestore';
import { IFilter } from './Filters';

export interface ICollection {
  save(path: string, data: any): Promise<string>;
  findAll(path: string): Promise<DocumentData[]>;
  findWithFilters(path: string, filters: IFilter[]): Promise<DocumentData[]>;
  update(path: string, data: any): Promise<string>;
  delete(path: string, id: string): Promise<string>;
}
