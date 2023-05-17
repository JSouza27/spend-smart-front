import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  ${({ theme }) => css`
    border: 1px solid ${theme.colors.neutral_300};
    border-radius: ${theme.border.radius};
    width: 100%;

    .rdt_TableHead {
      color: ${theme.colors.neutral_800};
      font-size: ${theme.font.sizes.xxsmall};
      font-weight: ${theme.font.semi_bold};
      line-height: ${theme.spacings.xsmall};
      text-transform: uppercase;
    }

    .rdt_TableHeadRow {
      background-color: ${theme.colors.neutral_50};
    }

    .rdt_TableRow {
      color: ${theme.colors.neutral_900};
      font-size: ${theme.font.sizes.xsmall};
      min-height: 6.4rem;
      line-height: ${theme.spacings.xsmall};
    }
  `}
`;
