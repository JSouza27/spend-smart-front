import { format } from 'date-fns';
import { IUser } from '../../core/dto/user';
import { Collection } from '../../shared/firebase/collection/collection';
import { ITransition } from './transition';
import { TransitionDTO } from './transitionDTO';

export class TransitionsService {
  private collection = new Collection();

  async create(
    transition: Omit<ITransition, 'id'>,
    user: IUser
  ): Promise<TransitionDTO> {
    try {
      const transitionId = await this.collection.save(
        `extract/${user.account}/transitions`,
        transition
      );

      const transitionDto = new TransitionDTO(
        transitionId,
        transition.description,
        transition.invoiceDueDate,
        transition.value,
        transition.type
      );

      return transitionDto;
    } catch (e: any) {
      throw new Error(e);
    }
  }

  async findAll(user: IUser): Promise<ITransition[]> {
    try {
      const allDocs = await this.collection.findAll(
        `extract/${user.account}/transitions`
      );

      return allDocs.map((doc) => {
        const date = doc.invoiceDueDate.seconds;

        return {
          id: doc.id,
          description: doc.description,
          invoiceDueDate: format(date, 'dd/MM/yyyy'),
          value: doc.value,
          type: doc.type
        };
      });
    } catch (e: any) {
      throw new Error(e);
    }
  }
}
