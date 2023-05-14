import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  gap: 1rem;
`;

export const UserContainer = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    span {
      color: ${theme.colors.neutral_800};
      line-height: 2.4rem;
    }
  `}
`;

export const ImageContainer = styled.div`
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
