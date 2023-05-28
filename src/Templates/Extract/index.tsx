import { useEffect, useState } from 'react';
import { Plus } from '@styled-icons/bootstrap';
import { LeftArrow, RightArrow } from '@styled-icons/boxicons-solid';
import { getMonth, getYear } from 'date-fns';

import { monthNameList } from '../../utils/monthNameList';
import { useTransaction } from '../../contexts/transaction';
import Button from '../../components/Button';
import Card from '../../components/Card';
import Base from '../Base';
import Table from '../../components/Table';
import * as S from './styles';

export type ExtractProps = {
  totalIncomes: number;
  totalExpenses: number;
  balanceOfTheMonth: number;
  columns: any;
  rows: any;
  handleModalChange: () => void;
};

export default function Extract({
  totalIncomes,
  totalExpenses,
  balanceOfTheMonth,
  columns,
  rows,
  handleModalChange
}: ExtractProps) {
  const [dateInformation, setDateInformation] = useState({ month: 0, year: 0 });
  const { setDate, date } = useTransaction();

  const handleMonthChange = (n: number) => {
    const { year } = dateInformation;
    const dt = new Date(year, n);
    setDate(dt);
  };

  useEffect(() => {
    setDateInformation({
      month: getMonth(date),
      year: getYear(date)
    });
  }, [date]);

  const { month, year } = dateInformation;
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

        <S.Section className="container-button" justifyContent="space-between">
          <Button
            type="button"
            className="btn-new-transaction"
            icon={<Plus />}
            onClick={() => handleModalChange()}
          >
            Nova Transação
          </Button>
          <S.Section gap="0.2rem" flexWrap="nowrap">
            <Button
              size="small"
              type="button"
              className="btn-left"
              icon={<LeftArrow size={12} />}
              onClick={() => handleMonthChange(month - 1)}
            />
            <S.DateContainer>{`${monthNameList[month]}-${year}`}</S.DateContainer>
            <Button
              size="small"
              type="button"
              className="btn-right"
              icon={<RightArrow size={12} />}
              onClick={() => handleMonthChange(month + 1)}
            />
          </S.Section>
        </S.Section>

        <S.Section>
          <Table columns={columns} data={rows} />
        </S.Section>
      </S.Container>
    </Base>
  );
}
