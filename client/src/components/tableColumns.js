import { useMemo } from 'react';

export const TableColumns = (
  header3,
  accessor3,
  header4,
  accessor4,
  manageCellValue
) => {
  const tableColumns = [
    {
      Header: 'Names',
      accessor: 'name',
      Cell: ({ row }) => row.original.user.firstName
    },
    {
      Header: 'Email',
      accessor: 'email',
      Cell: ({ row }) => row.original.user.email
    },
    {
      Header: header3,
      accessor: accessor3
    },
    {
      Header: header4,
      accessor: accessor4
    },
    {
      Header: 'Management',
      accessor: 'management',
      Cell: manageCellValue
    }
  ];

  const columns = useMemo(() => tableColumns, []);
  return columns;
};
