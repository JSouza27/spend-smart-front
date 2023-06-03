import { ICollection } from '../../../shared/interface/Collections';

export class CollectionInMemory implements ICollection {
  transaction = [
    {
      id: 'bPMfEaUh7t2wjVQa4HpM',
      value: 3500,
      type: 'income',
      description: 'Meu salário',
      invoiceDueDate: {
        seconds: 1685070000,
        nanoseconds: 0
      }
    }
  ];

  save = jest.fn().mockResolvedValue(this.transaction[0].id);

  findAll = jest.fn().mockResolvedValue(this.transaction);

  findWithFilters = jest.fn().mockResolvedValue(this.transaction);

  update = jest.fn();

  delete = jest.fn();
}
