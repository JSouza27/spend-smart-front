import styled, { css } from 'styled-components';

type WrapperProps = {
  isAuthenticated: boolean;
};

export const Wrapper = styled.header<WrapperProps>`
  ${({ theme, isAuthenticated }) => css`
    background-color: ${theme.colors.neutral_100};
    border: none;
    border-radius: ${theme.border.radius};
    display: ${isAuthenticated ? 'flex' : 'none'};
    justify-content: flex-end;
    padding: 1.6rem;
    width: 100%;

    .salutation {
      display: none;
    }

    @media (min-width: 767px) {
      justify-content: space-between;
      padding: 2.4rem;

      .salutation {
        display: block;
      }
    }
  `}
`;
