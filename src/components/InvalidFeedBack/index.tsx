import React from 'react';

import * as S from './styles';
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';

export type InvalidFeedBackProps = {
  message: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
};

export default function InvalidFeedBack({ message }: InvalidFeedBackProps) {
  return <S.Wrapper>{message.toString()}</S.Wrapper>;
}
