import styled, { css } from 'styled-components';

export const Container = styled.section`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  height: 100%;
  justify-content: center;
  width: 100%;
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
    height: 14.8rem;
    overflow: hidden;
    width: 14.8rem;
  `}
`;

export const Fields = styled.div`
  ${({ theme }) => css`
    align-items: center;
    display: flex;
    gap: 1.2rem;
    width: 100%;

    label {
      color: ${theme.colors.neutral_700};
      font-size: ${theme.font.sizes.xsmall};
      line-height: ${theme.font.sizes.medium};
    }

    button > span {
      color: ${theme.colors.neutral_0};
    }
  `}
`;

export const AdditionalUserContainer = styled.div`
  ${({ theme }) => css`
    align-items: center;
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    width: 100%;

    span {
      color: ${theme.colors.neutral_700};
      font-size: ${theme.font.sizes.xsmall};
      line-height: ${theme.font.sizes.medium};
    }

    button > span {
      color: ${theme.colors.neutral_0};
    }
  `}
`;

export const Checkbox = styled.input`
  ${({ theme }) => css`
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;

    border: 1px solid;
    border-color: ${theme.colors.neutral_400};
    border-radius: ${theme.border.radius};
    cursor: pointer;
    font-size: 1rem;
    height: 1.6rem;
    position: relative;
    width: 1.6rem;

    &:checked {
      background-color: ${theme.colors.blue_400};
      border-color: ${theme.colors.blue_400};
    }

    &::after {
      content: '✔';
      border-radius: 2px;
      color: ${theme.colors.neutral_0};
      display: inline-block;
      height: 10px;
      left: 50%;
      opacity: 0;
      position: absolute;
      top: 50%;
      transform: translate(-50%, -50%);
      transition: opacity 0.2s ease-in-out;
      vertical-align: middle;
      text-align: center;
      width: 10px;
    }

    &:checked::after {
      opacity: 1;
    }
  `}
`;

export const Text = styled.span`
  ${({ theme }) => css`
    color: ${theme.colors.neutral_700};
    font-size: ${theme.font.sizes.xsmall};
    line-height: ${theme.font.sizes.medium};
  `}
`;
