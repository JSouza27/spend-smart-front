import styled, { css } from 'styled-components';

export const Wrapper = styled.span`
  ${({ theme }) => css`
    color: ${theme.colors.red_400};
    font-size: ${theme.font.sizes.xsmall};
    line-height: ${theme.font.sizes.medium};
  `}
`;
