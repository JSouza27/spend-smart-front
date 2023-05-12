import { ThemeProvider } from 'styled-components';
import GlobalStyle from 'styles/global'
import theme from 'styles/theme'

export const decorators = [
  (Story) => (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {<Story />}
    </ThemeProvider>
  ),
];
