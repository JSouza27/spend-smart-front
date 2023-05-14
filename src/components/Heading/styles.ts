import styled, { css } from 'styled-components';
import { HeadingProps } from '.';

export const Heading = styled.h1.attrs<HeadingProps>(({ level }) => ({
  as: `h${level}`
}))<HeadingProps>`
  ${({
    color = 'neutral_900',
    size = 'xxxlarge',
    fontWeight = 600,
    lineHeight = '4rem'
  }) => css`
    color: ${color};
    font-size: ${size};
    font-weight: ${fontWeight};
    line-height: ${lineHeight};
  `}
`;
