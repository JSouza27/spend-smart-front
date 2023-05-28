import { InputHTMLAttributes } from 'react';
import { FieldValues, RegisterOptions, useFormContext } from 'react-hook-form';

import * as S from './styles';
import InvalidFeedBack from '../InvalidFeedBack';

export type TextFieldProps = {
  label: string;
  name: string;
  options?: RegisterOptions<FieldValues, string> | undefined;
} & InputHTMLAttributes<HTMLInputElement>;

export default function TextField({
  label,
  name,
  required,
  options,
  ...props
}: TextFieldProps) {
  const {
    register,
    formState: { errors }
  } = useFormContext();

  const isError = Object.keys(errors).includes(name);
  const message = errors[name]?.message;

  return (
    <S.Wrapper>
      <S.Label htmlFor={name}>{label}</S.Label>
      <S.Input
        id={name}
        isError={isError}
        type="text"
        {...register(name, options)}
        {...props}
      />
      {errors[name] && message !== undefined && (
        <InvalidFeedBack message={message} />
      )}
    </S.Wrapper>
  );
}
