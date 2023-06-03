import React, { ButtonHTMLAttributes, HtmlHTMLAttributes } from 'react';
import * as S from './styles';

export type ButtonProps = {
  children?: React.ReactNode;
  fullWidth?: boolean;
  size?: 'small' | 'medium' | 'large';
  icon?: React.ReactNode;
  appearance?: 'primary' | 'secondary' | 'minimal' | 'error';
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  children,
  size = 'medium',
  icon,
  appearance = 'primary',
  fullWidth,
  ...props
}: ButtonProps) {
  return (
    <S.Wrapper
      fullWidth={fullWidth}
      size={size}
      hasIcon={!!icon}
      {...props}
      appearance={appearance}
    >
      {!!icon && icon}
      {!!children && <span>{children}</span>}
    </S.Wrapper>
  );
}
