import styled, { DefaultTheme, css } from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

export const Content = styled.div`
  align-items: center;
  display: flex;
  gap: 1.2rem;
`;

const inputModifiers = {
  true: (theme: DefaultTheme) => css`
    background-color: ${theme.colors.neutral_100};
    border: none;

    & ~ label {
      color: ${theme.colors.neutral_600};
    }

    &:checked::before {
      content: '';
      border-radius: 50%;
      background-color: ${theme.colors.neutral_500};
      display: inline-block;
      height: 0.8rem;
      width: 0.8rem;
      transition: background-color ${theme.transition.default};
    }
  `,
  false: (theme: DefaultTheme) => css`
    border-color: ${theme.colors.neutral_400};

    &:active {
      border-color: ${theme.colors.neutral_500};
      background-color: ${theme.colors.neutral_100};
    }

    &:focus {
      border-color: ${theme.colors.blue_300};
      box-shadow: 0 0 0 2px ${theme.colors.blue_200};
      outline-color: ${theme.colors.blue_300};
    }

    &:hover {
      border-color: ${theme.colors.neutral_600};
    }

    &:checked {
      border-color: ${theme.colors.blue_400};
      border-width: 4px;
    }

    &:checked:hover {
      border-color: ${theme.colors.blue_500};
    }

    &:checked:active {
      border-color: ${theme.colors.blue_600};
    }
  `
};

export const Input = styled.input`
  ${({ theme, disabled }) => css`
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;

    border: 1px solid;
    border-radius: 100%;
    height: 1.6rem;
    outline-color
    text-align: center;
    transition: background-color ${theme.transition.default};
    width: 1.6rem;

    ${disabled && inputModifiers.true(theme)}
    ${!disabled && inputModifiers.false(theme)}
  `}
`;

export const Label = styled.label`
  ${({ theme }) => css`
    color: ${theme.colors.neutral_700};
    font-size: ${theme.font.sizes.small};
    line-height: ${theme.font.sizes.xlarge};
  `}
`;

export const InvalidFeedback = styled.span`
  ${({ theme }) => css`
    color: ${theme.colors.red_400};
    font-size: ${theme.font.sizes.xsmall};
    line-height: ${theme.font.sizes.medium};
  `}
`;
