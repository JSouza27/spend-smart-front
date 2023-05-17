import { Plus } from '@styled-icons/bootstrap';

import Button from '../../components/Button';
import Card from '../../components/Card';
import Base from '../Base';
import * as S from './styles';
import Table from '../../components/Table';

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
          <Button type="button" icon={<Plus />}>
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
