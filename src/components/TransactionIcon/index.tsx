import { ArrowTrending } from '@styled-icons/fluentui-system-filled';

import * as S from './styles';

export type TransactionIconProps = {
  type: 'income' | 'expense';
};

export default function TransactionIcon({ type }: TransactionIconProps) {
  return (
    <S.Wrapper data-testid="arrow-icon" type={type}>
      <ArrowTrending className="icon" size={16} title="icon" />
    </S.Wrapper>
  );
}
