import { ArrowTrending, Savings } from '@styled-icons/fluentui-system-filled';

import theme from '../../styles/theme';
import { CurrencyFormatter } from '../../utils/currencyFormatter';
import Heading from '../Heading';
import * as S from './styles';

export type CardProps = {
  title: string;
  type: 'expense' | 'income' | 'balance';
  value: number;
};

export default function Card({ title, type, value }: CardProps) {
  const balanceResult = (value: number): string => {
    if (value > 0) {
      return theme.colors.green_400;
    } else if (value < 0) {
      return theme.colors.red_400;
    } else {
      return theme.colors.neutral_800;
    }
  };

  const colorByType = (): string => {
    if (type === 'income') return theme.colors.green_400;
    if (type === 'expense') return theme.colors.red_400;
    if (type === 'balance') return balanceResult(value);

    return theme.colors.neutral_800;
  };

  return (
    <S.Wrapper>
      <Heading level={3} size="small">
        {title}
      </Heading>

      <S.Container colorByType={colorByType()} type={type}>
        <span>{CurrencyFormatter.formatter(value).replace('R$', '')}</span>
        {type === 'balance' ? (
          <Savings className="icon" size={38} title="icon" />
        ) : (
          <ArrowTrending className="icon" size={38} title="icon" />
        )}
      </S.Container>
    </S.Wrapper>
  );
}
