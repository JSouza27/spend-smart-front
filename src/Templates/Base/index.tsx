import * as S from './styles';

export type BaseTemplateProps = {
  children: React.ReactNode;
};

export default function Base({ children }: BaseTemplateProps) {
  return (
    <S.Wrapper>
      <S.Page>{children}</S.Page>
    </S.Wrapper>
  );
}
