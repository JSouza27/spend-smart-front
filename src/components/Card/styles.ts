import styled, { css } from 'styled-components';
import { CardProps } from '.';

type ContainerProps = {
  colorByType: string;
} & Pick<CardProps, 'type'>;

export const Wrapper = styled.div`
  ${({ theme }) => css`
    background-color: ${theme.colors.neutral_0};
    border: 1px solid ${theme.colors.neutral_400};
    border-radius: 0.8rem;
    box-shadow: 0px 4px 8px rgba(16, 24, 64, 0.08);
    flex: 1 1 auto;
    padding: ${theme.spacings.xsmall};
    max-width: 60rem;

    @media (min-width: 767px) {
      padding: ${theme.spacings.small};
    }
  `}
`;

export const Container = styled.div<ContainerProps>`
  ${({ theme, colorByType, type }) => css`
    align-items: center;
    color: ${colorByType};
    display: flex;
    font-size: clamp(2rem, 0.87vw + 1.76rem, 2.8rem);
    font-weight: ${theme.font.bold};
    justify-content: space-between;

    .icon {
      color: ${colorByType};
      transform: ${type === 'expense' && 'scale(-1) rotate(270deg)'};
    }

    span::before {
      content: 'R$';
      font-size: ${theme.font.sizes.small};
      margin-right: 1rem;
    }
  `}
`;
