import { CollectionInMemory } from './in-memory/collectionInMemory';
import { ITransactionModal } from './transaction';
import { TransactionService } from './transactionServive';

describe('TransactionService', () => {
  const transaction: ITransactionModal = {
    description: 'Meu salário',
    value: 3500,
    invoiceDueDate: new Date('2023-05-26T03:00:00.000Z'),
    type: 'income'
  };
  const accountPath = 'extract/555555-1/transactions';
  const mockResponse = {
    ...transaction,
    id: 'bPMfEaUh7t2wjVQa4HpM',
    invoiceDueDate: '26/05/2023'
  };

  let service: TransactionService;
  let collectionInMemory: CollectionInMemory;

  beforeAll(() => {
    collectionInMemory = new CollectionInMemory();
    service = new TransactionService(collectionInMemory);
  });

  it('should add a new transaction', async () => {
    const res = await service.create(transaction, accountPath);

    expect(res).toMatchObject(mockResponse);
  });

  it('should return an error if you pass an invalid path', async () => {
    jest.spyOn(collectionInMemory, 'save').mockRejectedValueOnce(new Error());

    expect(service.create(transaction, '')).rejects.toThrowError();
  });

  it('should return a list of transactions', async () => {
    const res = await service.findAll(accountPath);

    expect(res).toMatchObject([mockResponse]);
  });

  it("should return a list of last month's transactions per parameter", async () => {
    const res = await service.findForMonth(accountPath, new Date(2023, 5, 26));

    expect(res).toMatchObject([mockResponse]);
  });

  it('should update the document', async () => {
    const obj = { ...mockResponse, value: 100 };
    const res = await service.update(accountPath, obj);

    expect(res).toMatchObject({
      message: 'Documento atualizado com sucesso',
      status: true
    });
  });

  it('should remove the document', async () => {
    const res = await service.delete(accountPath, mockResponse.id);

    expect(res).toMatchObject({
      message: 'Documento removido com sucesso',
      status: true
    });
  });
});
