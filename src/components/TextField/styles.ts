import styled, { DefaultTheme, css } from 'styled-components';
import { TextFieldProps } from '.';

export const Wrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: ${theme.spacings.xxsmall};
    width: 100%;
  `}
`;

type LabelProps = Pick<TextFieldProps, 'required' | 'disabled'>;

export const Label = styled.label<LabelProps>`
  ${({ theme, required, disabled }) => css`
    color: ${disabled ? theme.colors.neutral_600 : theme.colors.neutral_700};
    font-size: ${theme.font.sizes.xsmall};
    line-height: ${theme.font.sizes.medium};

    &::before {
      content: ${required ? '*' : ''};
      color: ${theme.colors.red_400};
    }
  `}
`;

type InputProps = {
  isError: boolean;
};

const inputModifiers = {
  true: (theme: DefaultTheme) => css`
    border: 1px solid;
    border-color: ${theme.colors.red_400};
    color: ${theme.colors.neutral_800};

    &:focus {
      border-color: ${theme.colors.red_300};
      box-shadow: 0 0 0 2px ${theme.colors.red_200};
      outline-color: ${theme.colors.red_300};
    }
  `,
  false: (theme: DefaultTheme) => css`
    border: 1px solid;
    border-color: ${theme.colors.neutral_400};
    color: ${theme.colors.neutral_600};

    &:focus {
      border-color: ${theme.colors.blue_300};
      box-shadow: 0 0 0 2px ${theme.colors.blue_200};
      outline-color: ${theme.colors.blue_300};
    }
  `
};

export const Input = styled.input<InputProps>`
  ${({ theme, isError }) => css`
    background-color: ${theme.colors.neutral_0};
    border-radius: ${theme.border.radius};
    font-size: ${theme.font.sizes.xsmall};
    padding: 1.2rem ${theme.spacings.xxsmall};
    width: 100%;

    ${isError && inputModifiers.true(theme)};
    ${!isError && inputModifiers.false(theme)};

    &:disabled {
      background-color: ${theme.colors.neutral_100};
      border: 1px solid ${theme.colors.neutral_300};
      color: ${theme.colors.neutral_600};
    }
  `}
`;
