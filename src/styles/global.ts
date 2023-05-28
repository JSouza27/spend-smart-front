import { createGlobalStyle, css } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;

    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  ${({ theme }) => css`
    html {
      font-size: 62.5%;
    }

    body {
      color: ${theme.colors.neutral_800};
      font-family: ${theme.font.family};
      font-size: ${theme.font.sizes.medium};
      font-display: swap;

      .swal-title {
        color: ${theme.colors.neutral_900};
      }

      .swal-popup {
        border-radius: 0.8rem;
        font-size: ${theme.font.sizes.xsmall};
      }

      .swal-action {
        display: flex;
        gap: 0.8rem;
      }

      .swal-confirm-button {
        background-color: ${theme.colors.blue_400};
        border: 0;
        border-radius: ${theme.border.radius};
        color: ${theme.colors.neutral_0};
        cursor: pointer;
        font-family: ${theme.font.family};
        font-size: ${theme.font.sizes.small};
        font-weight: ${theme.font.semi_bold};
        padding: 0.8rem 1.6rem;
      }

      .swal-cancel-button {
        background-color: ${theme.colors.neutral_0};
        border: 1px solid ${theme.colors.neutral_400};
        border-radius: ${theme.border.radius};
        color: ${theme.colors.neutral_700};
        cursor: pointer;
        font-family: ${theme.font.family};
        font-size: ${theme.font.sizes.small};
        font-weight: ${theme.font.semi_bold};
        padding: 0.8rem 1.6rem;
      }
    }
  `}
`;

export default GlobalStyles;
