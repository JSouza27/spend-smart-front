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
    margin-top: ${theme.spacings.xxsmall};
    padding: 0.8rem 0;
    position: absolute;
    right: 2rem;
    z-index: ${theme.layers.alwaysOnTop};

    &::before {
      content: '';
      border-bottom: 0.8rem solid ${theme.colors.neutral_0};
      border-left: 0.8rem solid transparent;
      border-right: 0.8rem solid transparent;
      position: absolute;
      top: -0.6rem;
      right: 2.4rem;
    }
  `}
`;

export const Overlay = styled.div`
  ${({ theme }) => css`
    background: transparent;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: ${theme.layers.overlay};
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

    ${Content},
    ${Overlay} {
      transition: opacity ${theme.transition.fast};

      ${isOpen && wrapperModifiers.open()}
      ${!isOpen && wrapperModifiers.close()}
    }
  `}
`;
