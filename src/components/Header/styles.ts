import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  ${({ theme }) => css`
    background-color: ${theme.colors.neutral_100};
    border: none;
    border-radius: ${theme.border.radius};
    display: flex;
    justify-content: flex-end;
    padding: 1.6rem;
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
