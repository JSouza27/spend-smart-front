import DataTable from 'react-data-table-component';

import * as S from './styles';

export type TableProps = {
  columns: any;
  data: any;
};

export default function Table({ columns, data }: TableProps) {
  return (
    <S.Wrapper>
      <DataTable
        columns={columns}
        data={data}
        defaultSortFieldId={2}
        pagination
        responsive
      />
    </S.Wrapper>
  );
}
