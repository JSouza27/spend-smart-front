import { InputHTMLAttributes } from 'react';
import { FieldValues, RegisterOptions, useFormContext } from 'react-hook-form';
import InvalidFeedBack from '../InvalidFeedBack';

import * as S from './styles';

export type RadioButtonProps = {
  id: string;
  label: string;
  name: string;
  options?: RegisterOptions<FieldValues, string> | undefined;
} & InputHTMLAttributes<HTMLInputElement>;

export default function RadioButton({
  id,
  label,
  name,
  options,
  ...props
}: RadioButtonProps) {
  const {
    register,
    formState: { errors }
  } = useFormContext();

  const message = errors[name]?.message;

  return (
    <S.Wrapper>
      <S.Content>
        <S.Input id={id} type="radio" {...register(name, options)} {...props} />
        <S.Label htmlFor={id}>{label}</S.Label>
      </S.Content>

      {errors[name] && message !== undefined && (
        <InvalidFeedBack message={message} />
      )}
    </S.Wrapper>
  );
}
