import React, { FormHTMLAttributes } from 'react';

import * as S from './styles';

export type FormProps = {
  children: React.ReactNode;
} & FormHTMLAttributes<HTMLFormElement>;

export default function Form({ children }: FormProps) {
  return <S.Wrapper>{children}</S.Wrapper>;
}
