import React, { HTMLAttributes } from 'react';

import * as S from './styles';
import theme from '../../styles/theme';

export type HeadingProps = {
  color?: keyof typeof theme.colors;
  size?: keyof typeof theme.font.sizes;
  fontWeight?: 400 | 600;
  lineHeight?: string | number;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
} & HTMLAttributes<HTMLHeadingElement>;

export default function Heading({ children, ...props }: HeadingProps) {
  return <S.Heading {...props}>{children}</S.Heading>;
}
