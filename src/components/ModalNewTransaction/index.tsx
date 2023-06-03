import { ChangeEvent } from 'react';
import { useFormContext } from 'react-hook-form';
import { parseISO } from 'date-fns';

import Heading from '../Heading';
import RadioButton from '../RadioButton';
import TextField from '../TextField';
import Button from '../Button';
import InvalidFeedBack from '../InvalidFeedBack';
import * as S from './styles';
import { useTransaction } from '../../contexts/transaction';

export type ModalNewTransactionProps = {
  showModal: boolean;
  onClose: () => void;
};

export default function ModalNewTransaction({
  showModal,
  onClose
}: ModalNewTransactionProps) {
  const { saveTransaction, isEdit, setIsEdit, updateTransaction } =
    useTransaction();

  const {
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: { errors }
  } = useFormContext();

  const onSubmit = async (data: any) => {
    const valueFormated = data['value'].includes(',')
      ? data['value'].replace(',', '.')
      : data['value'];

    const obj = {
      ...data,
      invoiceDueDate: isEdit
        ? parseISO(data.invoiceDueDate)
        : data.invoiceDueDate,
      value: Number(valueFormated)
    };

    if (isEdit) {
      updateTransaction(obj);
      setIsEdit(false);
    } else {
      saveTransaction(obj);
    }
    reset();
    onClose();
  };

  const handleDateChange = (date: ChangeEvent<HTMLInputElement>) => {
    const convertDated = parseISO(date.target.value);
    setValue('invoiceDueDate', convertDated);
  };

  return (
    <S.Wrapper isOpen={showModal}>
      <S.Content aria-hidden={!showModal}>
        <S.ModalHearder>
          <Heading level={1} fontWeight={600} size="large">
            Adicionar Nova Transação
          </Heading>

          <button type="button" onClick={onClose}>
            x
          </button>
        </S.ModalHearder>

        <S.ModalBody>
          <S.Form onSubmit={handleSubmit(onSubmit)}>
            <TextField label="Descrição" name="description" type="text" />
            <TextField label="Valor" name="value" type="text" />

            <S.Container flexWrap="wrap" alignItems="flex-start">
              <S.Container width="16rem">
                <RadioButton
                  label="Receita"
                  name="type"
                  value="income"
                  id="income"
                />
                <RadioButton
                  label="Despesa"
                  name="type"
                  value="expense"
                  id="expense"
                />
              </S.Container>

              <S.Container
                direction="column"
                alignItems="flex-end"
                width="auto"
              >
                <S.Date
                  data-testid="date-input"
                  type="date"
                  onChange={handleDateChange}
                  value={getValues('invoiceDueDate')}
                />
                {errors['invoiceDueDate'] &&
                  errors['invoiceDueDate'].message !== undefined && (
                    <InvalidFeedBack
                      message={errors['invoiceDueDate'].message}
                    />
                  )}
              </S.Container>
            </S.Container>

            <S.ButtonContainer>
              <Button type="button" appearance="secondary" onClick={onClose}>
                Cancelar
              </Button>
              <Button type="submit">Salvar</Button>
            </S.ButtonContainer>
          </S.Form>
        </S.ModalBody>
      </S.Content>
      <S.Overlay aria-hidden={!showModal} onClick={onClose} />
    </S.Wrapper>
  );
}
