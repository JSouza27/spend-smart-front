import styled, { DefaultTheme, css } from 'styled-components';

import { TransactionIconProps } from '.';

type WrapperProps = Pick<TransactionIconProps, 'type'>;

const wrapperModifiers = {
  income: (theme: DefaultTheme) => css`
    background-color: ${theme.colors.green_400};
  `,
  expense: (theme: DefaultTheme) => css`
    background-color: ${theme.colors.red_400};
    transform: scale(-1) rotate(270deg);
  `
};
export const Wrapper = styled.div<WrapperProps>`
  ${({ theme, type }) => css`
    align-items: center;
    border-radius: 100%;
    color: ${theme.colors.neutral_0};
    display: flex;
    justify-content: center;
    height: 3.2rem;
    overflow: hidden;
    width: 3.2rem;

    ${!!type && wrapperModifiers[type](theme)}
  `}
`;
