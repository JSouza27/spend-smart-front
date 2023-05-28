import styled, { css } from 'styled-components';

export const Overlay = styled.div`
  ${({ theme }) => css`
    background-color: rgba(71, 77, 102, 0.64);
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: ${theme.layers.overlay};
  `}
`;

export const Content = styled.div`
  ${({ theme }) => css`
    align-items: flex-start;
    background-color: ${theme.colors.neutral_0};
    box-shadow: 0px 4px 8px rgba(16, 24, 64, 0.08);
    border-radius: 0.8rem;
    display: flex;
    flex-direction: column;
    gap: ${theme.spacings.small};
    max-width: 50rem;
    padding: ${theme.spacings.small};
    position: relative;
    width: 80%;
    z-index: ${theme.layers.alwaysOnTop};
  `}
`;

type WrapperProps = {
  isOpen?: boolean;
};

const wrapperModifiers = {
  open: () => css`
    opacity: 1;
    pointer-events: auto;
  `,
  close: () => css`
    opacity: 0;
    pointer-events: none;
  `
};

export const Wrapper = styled.div<WrapperProps>`
  ${({ isOpen, theme }) => css`
    align-items: center;
    display: flex;
    justify-content: center;
    position: absolute;
    height: 100vh;
    top: 0;
    left: 0;
    width: 100vw;

    ${Content},
    ${Overlay} {
      transition: opacity ${theme.transition.fast};

      ${isOpen && wrapperModifiers.open()}
      ${!isOpen && wrapperModifiers.close()}
    }
  `}
`;

export const ModalHearder = styled.div`
  ${({ theme }) => css`
    align-items: center;
    display: flex;
    justify-content: space-between;
    width: 100%;

    & > button {
      background-color: transparent;
      border: 0;
      color: ${theme.colors.neutral_800};
      cursor: pointer;
      font-size: ${theme.font.sizes.large};
      height: 2.5rem;
      outline-color: ${theme.colors.blue_200};
      width: 2.5rem;
    }
  `}
`;

export const ModalBody = styled.div`
  ${({ theme }) => css`
    align-items: center;
    display: flex;
    flex-direction: column;
    gap: ${theme.spacings.xxsmall};
    width: 100%;
  `}
`;

export const Form = styled.form`
  ${({ theme }) => css`
    align-items: center;
    display: flex;
    flex-direction: column;
    gap: ${theme.spacings.xxsmall};
    width: 100%;
  `}
`;

type ContainerProps = {
  direction?: 'row' | 'column';
  flexWrap?: 'nowrap' | 'wrap';
  width?: string;
  alignItems?: 'center' | 'flex-start' | 'flex-end';
};

export const Container = styled.div<ContainerProps>`
  ${({
    theme,
    direction = 'row',
    flexWrap = 'nowrap',
    width = '100%',
    alignItems = 'center'
  }) => css`
    align-items: ${alignItems};
    display: flex;
    flex-direction: ${direction};
    flex-wrap: ${flexWrap};
    gap: ${theme.spacings.xxsmall};
    flex: 1 1 auto;
    width: ${width};
  `}
`;

export const Date = styled.input`
  ${({ theme }) => css`
    background-color: ${theme.colors.neutral_0};
    border: 1px solid ${theme.colors.neutral_400};
    border-radius: ${theme.border.radius};
    color: ${theme.colors.neutral_700};
    font-family: ${theme.font.family};
    flex: 1 1 auto;
    font-size: ${theme.font.sizes.xsmall};
    line-height: ${theme.spacings.xsmall};
    max-width: 20rem;
    padding: 0.8rem 1.2rem;

    &:focus {
      border-color: ${theme.colors.blue_300};
      box-shadow: 0 0 0 2px ${theme.colors.blue_200};
      outline-color: ${theme.colors.blue_300};
    }

    &:disabled {
      background-color: ${theme.colors.neutral_100};
      border-color: ${theme.colors.neutral_300};
      color: ${theme.colors.neutral_600};
    }
  `}
`;

export const ButtonContainer = styled.div`
  align-items: center;
  align-self: flex-end;
  display: flex;
  gap: 0.8rem;
  margin-top: 1.6rem;
`;
