import { Plus } from '@styled-icons/bootstrap';

import Button from '../../components/Button';
import Card from '../../components/Card';
import Base from '../Base';
import Table from '../../components/Table';
import mockUsuario from '../../data/constants/mockUsuario';
import { TransitionsService } from '../../server/modules/transitions/transitionsServive';
import { TransitionType } from '../../server/modules/transitions/transitionType';
import * as S from './styles';

export type ExtractProps = {
  totalIncomes: number;
  totalExpenses: number;
  balanceOfTheMonth: number;
  columns: any;
  rows: any;
};

export default function Extract({
  totalIncomes,
  totalExpenses,
  balanceOfTheMonth,
  columns,
  rows
}: ExtractProps) {
  const addTransition = async () => {
    const service = new TransitionsService();
    const user = mockUsuario;
    const t = await service.findAll(user);

    // await service.create(
    //   {
    //     description: 'Conta de Luz',
    //     invoiceDueDate: new Date('03/05/2023'),
    //     value: 255.7,
    //     type: TransitionType.DESPESA
    //   },
    //   user
    // );
  };

  return (
    <Base>
      <S.Container>
        <S.Section>
          <Card title="Total de Receitas" type="income" value={totalIncomes} />
          <Card
            title="Total de Despesas"
            type="expense"
            value={totalExpenses}
          />
          <Card title="Saldo do Mês" type="balance" value={balanceOfTheMonth} />
        </S.Section>

        <S.Section>
          <Button type="button" icon={<Plus />} onClick={addTransition}>
            Nova Transação
          </Button>
        </S.Section>

        <S.Section>
          <Table columns={columns} data={rows} />
        </S.Section>
      </S.Container>
    </Base>
  );
}
