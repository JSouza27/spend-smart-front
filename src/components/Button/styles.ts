import styled, { DefaultTheme, css } from 'styled-components';
import { ButtonProps } from '.';

type WrapperProps = {
  hasIcon: boolean;
} & Pick<ButtonProps, 'size' | 'appearance'>;

const wrapperModifier = {
  small: (theme: DefaultTheme) => css`
    font-size: ${theme.font.sizes.xsmall};
    height: 2.4rem;
    padding: ${theme.spacings.xxxsmall} 1.2rem;
    line-height: ${theme.spacings.small};
  `,
  medium: (theme: DefaultTheme) => css`
    font-size: ${theme.font.sizes.xsmall};
    height: 3.2rem;
    padding: ${theme.spacings.xxsmall} ${theme.spacings.xsmall};
    line-height: ${theme.spacings.medium};
  `,
  large: (theme: DefaultTheme) => css`
    font-size: ${theme.font.sizes.small};
    height: 4rem;
    padding: 1.2rem ${theme.spacings.small};
    line-height: ${theme.spacings.large};
  `,
  withIcon: () => css`
    svg {
      color: inherit;
      width: 2rem;
    }
  `
};

const wrapperModifierColor = {
  primary: (theme: DefaultTheme) => css`
    background-color: ${theme.colors.blue_400};
    color: ${theme.colors.neutral_0};
    outline-color: ${theme.colors.blue_200};

    &:hover {
      background-color: ${theme.colors.blue_500};
    }

    &:active {
      background-color: ${theme.colors.blue_600};
    }

    &:focus {
      background-color: ${theme.colors.blue_500};
      border: 2px solid ${theme.colors.blue_200};
    }

    &:disabled {
      background-color: ${theme.colors.blue_500};
    }
  `,
  secondary: (theme: DefaultTheme) => css`
    background-color: ${theme.colors.neutral_0};
    border: 1px solid ${theme.colors.neutral_400};
    color: ${theme.colors.neutral_700};
    outline-color: ${theme.colors.blue_200};

    &:hover {
      border-color: ${theme.colors.neutral_600};
      color: ${theme.colors.neutral_800};
    }

    &:active {
      background-color: ${theme.colors.neutral_100};
      border-color: ${theme.colors.neutral_500};
      color: ${theme.colors.neutral_800};
    }

    &:focus {
      background-color: ${theme.colors.neutral_0};
      border-width: 2px;
      color: ${theme.colors.neutral_800};
    }

    &:disabled {
      border-color: ${theme.colors.neutral_300};
      color: ${theme.colors.neutral_500};
    }
  `,
  minimal: (theme: DefaultTheme) => css`
    background-color: transparent;
    color: ${theme.colors.neutral_700};
    outline-color: ${theme.colors.blue_200};

    &:hover {
      background-color: ${theme.colors.neutral_100};
      color: ${theme.colors.neutral_800};
    }

    &:active {
      background-color: ${theme.colors.neutral_200};
      color: ${theme.colors.neutral_800};
    }

    &:focus {
      background-color: ${theme.colors.neutral_0};
      color: ${theme.colors.neutral_800};
    }

    &:disabled {
      color: ${theme.colors.neutral_400};
    }
  `,
  error: (theme: DefaultTheme) => css`
    background-color: ${theme.colors.red_400};
    color: ${theme.colors.neutral_0};
    outline-color: ${theme.colors.red_100};

    &:hover {
      background-color: ${theme.colors.red_500};
    }

    &:active {
      background-color: ${theme.colors.red_600};
    }

    &:focus {
      background-color: ${theme.colors.red_500};
    }

    &:disabled {
      background-color: ${theme.colors.red_100};
    }
  `
};

export const Wrapper = styled.button<WrapperProps>`
  ${({ theme, size, hasIcon, appearance }) => css`
    align-items: center;
    border: 0;
    border-radius: ${theme.border.radius};
    cursor: pointer;
    display: flex;
    font-weight: ${theme.font.semi_bold};
    gap: ${theme.spacings.xxsmall};
    white-space: nowrap;

    ${!!size && wrapperModifier[size](theme)};
    ${!!hasIcon && wrapperModifier.withIcon};
    ${!!appearance && wrapperModifierColor[appearance](theme)}
  `}
`;
