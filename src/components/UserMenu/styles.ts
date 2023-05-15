import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  gap: 1rem;
`;

export const UserContainer = styled.div`
  ${({ theme }) => css`
    align-items: flex-start;
    display: flex;
    flex-direction: column;
    justify-content: center;

    span {
      color: ${theme.colors.neutral_800};
      font-size: ${theme.font.sizes.small};
      line-height: 2.4rem;
    }
  `}
`;

export const Avatar = styled.div`
  ${({ theme }) => css`
    align-items: center;
    background-color: ${theme.colors.neutral_400};
    border: none;
    border-radius: 100%;
    color: ${theme.colors.neutral_700};
    display: flex;
    justify-content: center;
    height: 5rem;
    overflow: hidden;
    width: 5rem;
  `}
`;

export const Nav = styled.nav`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    width: 20.8rem;

    a {
      text-decoration: none;
    }

    > a:last-child {
      border-top: 1px solid ${theme.colors.neutral_300};

      svg {
        color: ${theme.colors.red_400};
      }

      span {
        color: ${theme.colors.red_400};
      }

      > :hover {
        background-color: ${theme.colors.red_50};
        border-color: ${theme.colors.red_400};
      }
    }
  `}
`;

export const Title = styled.div`
  ${({ theme }) => css`
    height: 4rem;
    padding: ${theme.spacings.xsmall} ${theme.spacings.small};
  `}
`;

export const Link = styled.a`
  ${({ theme }) => css`
    align-items: center;
    background-color: ${theme.colors.neutral_0};
    border-left: 2px solid transparent;
    color: ${theme.colors.neutral_800};
    display: flex;
    height: 4rem;
    gap: 1.6rem;
    justify-content: flex-start;
    padding: 1.2rem ${theme.spacings.small};

    > svg {
      color: ${theme.colors.neutral_600};
    }

    &:hover {
      background-color: ${theme.colors.blue_50};
      border-left: 2px solid ${theme.colors.blue_400};
      color: ${theme.colors.blue_400};

      > svg {
        color: ${theme.colors.blue_400};
      }
    }
  `}
`;
