import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
`;

export const Page = styled.div`
  ${({ theme }) => css`
    max-width: ${theme.grid.container};
    width: 100%;
  `}
`;
