import { DocumentData, DocumentReference } from 'firebase/firestore';

export class TransitionDTO {
  private id: string;
  private description: string;
  private invoiceDueDate: Date | string;
  private value: number;
  private type: string;

  constructor(
    id: string,
    description: string,
    invoiceDueDate: Date | string,
    value: number,
    type: string
  ) {
    this.id = id;
    this.description = description;
    this.invoiceDueDate = invoiceDueDate;
    this.value = value;
    this.type = type;
  }
}
