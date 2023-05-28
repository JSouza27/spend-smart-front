import styled, { css } from 'styled-components';
import { HeadingProps } from '.';

export const Heading = styled.h1.attrs<HeadingProps>(({ level }) => ({
  as: `h${level}`
}))<HeadingProps>`
  ${({
    color = 'neutral_900',
    size = 'xxxlarge',
    fontWeight = 600,
    lineHeight = '4rem',
    theme
  }) => css`
    color: ${theme.colors[color]};
    font-size: ${theme.font.sizes[size]};
    font-weight: ${fontWeight};
    line-height: ${lineHeight};
  `}
`;
