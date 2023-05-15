import styled, { css } from 'styled-components';

export const Trigger = styled.div`
  ${() => css`
    align-items: center;
    display: flex;
    cursor: pointer;
    position: relative;
  `}
`;

export const Content = styled.div`
  ${({ theme }) => css`
    align-items: flex-start;
    background-color: ${theme.colors.neutral_0};
    filter: drop-shadow(0px 4px 8px rgba(16, 24, 64, 0.16));
    border-radius: ${theme.border.radius};
    display: flex;
    flex-direction: column;
    margin-top: ${theme.spacings.small};
    padding: 0.8rem 0;
    position: absolute;
    right: 1rem;
    top: 1rem;

    &::before {
      content: '';
      border-bottom: 0.6rem solid ${theme.colors.neutral_0};
      border-left: 0.6rem solid transparent;
      border-right: 0.6rem solid transparent;
      position: absolute;
      top: -0.6rem;
      right: 2.4rem;
    }
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
    position: relative;
    max-width: max-content;

    ${Content} {
      transition: opacity ${theme.transition.fast};

      ${isOpen && wrapperModifiers.open()}
      ${!isOpen && wrapperModifiers.close()}
    }
  `}
`;
