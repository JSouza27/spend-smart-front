import { TransitionType } from './transitionType';

export interface ITransition {
  id?: string;
  description: string;
  invoiceDueDate: Date | string;
  value: number;
  type: TransitionType;
}
