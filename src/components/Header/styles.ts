import styled, { css } from 'styled-components';

export const Wrapper = styled.header`
  ${({ theme }) => css`
    background-color: ${theme.colors.neutral_100};
    border: none;
    border-radius: ${theme.border.radius};
    display: flex;
    justify-content: center;
    padding: 1.6rem;
    width: 100%;

    @media (min-width: 767px) {
      padding: 2.4rem;
    }
  `}
`;

export const Limit = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: flex-end;
    max-width: ${theme.grid.container};
    width: 100%;

    .salutation {
      display: none;
    }

    @media (min-width: 767px) {
      justify-content: space-between;

      .salutation {
        display: block;
      }
    }
  `}
`;
