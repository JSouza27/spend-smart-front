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
