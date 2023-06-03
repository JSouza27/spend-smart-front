import { WhereFilterOp } from 'firebase/firestore';

export interface IFilter {
  attribute: string;
  op: WhereFilterOp;
  value: any;
}
