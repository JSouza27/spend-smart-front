import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
`;

export const Page = styled.main`
  ${({ theme }) => css`
    height: 100%;
    max-width: ${theme.grid.container};
    padding: ${theme.spacings.xsmall};
    width: 100%;

    @media (min-width: 767px) {
      padding: ${theme.spacings.small};
    }
  `}
`;
