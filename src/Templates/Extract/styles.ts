import styled, { css } from 'styled-components';

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  width: 100%;
`;

type SectionProps = {
  alignItems?: 'center' | 'flex-start' | 'flex-end';
  direction?: 'row' | ' row-reverse' | 'column' | 'column-reverse';
  flexWrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  justifyContent?:
    | 'center'
    | 'flex-start'
    | 'flex-end'
    | 'space-between'
    | 'space-around';
  gap?: string;
};

export const Section = styled.section<SectionProps>`
  ${({
    flexWrap = 'wrap',
    direction = 'row',
    alignItems = 'center',
    justifyContent = 'center',
    gap = '1.6rem'
  }) => css`
    align-items: ${alignItems};
    display: flex;
    flex-direction: ${direction};
    flex-wrap: ${flexWrap};
    gap: ${gap};
    justify-content: ${justifyContent};

    .btn-left,
    .btn-right {
      padding: 1.6rem 0.2rem;

      &:focus {
        border: 0;
      }
    }

    .btn-left {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }

    .btn-right {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  `}
`;

export const DateContainer = styled.div`
  ${({ theme }) => css`
    align-items: center;
    background-color: ${theme.colors.neutral_0};
    border: 1px solid ${theme.colors.neutral_400};
    display: flex;
    font-size: ${theme.font.sizes.xsmall};
    font-weight: ${theme.font.semi_bold};
    justify-content: center;
    padding: 0.75rem 1.6rem;
    text-transform: capitalize;
    width: 14rem;
  `}
`;
