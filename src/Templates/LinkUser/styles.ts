import styled, { css } from 'styled-components';

export const Wrapper = styled.section`
  ${({ theme }) => css`
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
  `}
`;

export const Container = styled.section`
  ${({ theme }) => css`
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1.6rem;

    & > h1 {
      align-self: flex-start;
    }

    & > span {
      align-self: flex-start;
      font-size: ${theme.font.sizes.small};

      & > a {
        color: ${theme.colors.blue_400};
        cursor: pointer;
        font-weight: ${theme.font.semi_bold};
        text-underline-offset: 0.4rem;

        :hover {
          color: ${theme.colors.blue_500};
        }
      }
    }
  `}
`;
