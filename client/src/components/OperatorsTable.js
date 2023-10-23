import React from 'react';
import { Link } from 'react-router-dom';
import { useGlobalFilter, usePagination, useTable } from 'react-table';
import { useSelector } from 'react-redux';
import CheckRole from '../utils/CheckRoles.js';
import Button from './Button.js';
import ManageDropDownOperator from './ManageDropDownOperator.js';
import SearchFilter from './SearchFilter.js';
import { TableColumns } from './tableColumns.js';

const OperatorsTable = ({ data }) => {
  const { user, authenticated } = useSelector((state) => state?.auth);
  const manageCellValue = ({ row }) => (
    <ManageDropDownOperator user={user} row={row} />
  );
  const columns = TableColumns(
    'Mobile Number',
    'mobileNumber',
    'Company',
    'company',
    manageCellValue
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    gotoPage,
    pageCount,
    setPageSize,
    prepareRow,
    pageOptions,
    state,
    setGlobalFilter
  } = useTable(
    {
      columns,
      data
    },
    useGlobalFilter,
    usePagination
  );

  const { globalFilter, pageIndex, pageSize } = state;

  return (
    <>
      <section className="flex justify-between content-center pb-7">
        <SearchFilter
          filter={globalFilter}
          setfilter={setGlobalFilter}
          placeholder="Search Operators..."
        />
        <CheckRole
          children={
            <Link to="operator/register">
              <Button
                name="Register new"
                styles="bg-primary text-white py-1 text-xs"
              />
            </Link>
          }
          role={['admin']}
        />
      </section>
      <table
        {...getTableProps()}
        className="w-full overflow-x-scroll font-raleway"
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()} className="pb-10 ">
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  className="text-left font-extrabold pr-5 border-b-2 pb-4"
                >
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      className="pr-5 py-4 border-b-2"
                    >
                      {cell.render('Cell')}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      {pageOptions.length > 1 && (
        <table className=" mt-3 flex justify-center w-full bg-gray-300 bg-opacity-20 ">
          <tfoot>
            <tr className="p-1 flex-row flex items-center justify-center my-2 mx-auto w-full font-raleway">
              <td colSpan={5}>
                <div className="w-full justify-center flex mx-auto flex-row items-center overflow-x-scroll">
                  <button
                    className="mx-2 rounded-circle font-bold flex items-center justify-center bg-primary h-[30px] w-[60px] cursor-pointer"
                    onClick={() => gotoPage(0)}
                    disabled={!canPreviousPage}
                  >
                    {'<|'}
                  </button>{' '}
                  <button
                    className="mx-2 font-bold font-raleway"
                    onClick={() => previousPage()}
                    disabled={!canPreviousPage}
                  >
                    Prev
                  </button>{' '}
                  <button
                    onClick={() => nextPage()}
                    disabled={!canNextPage}
                    className="mx-2 font-bold font-raleway cursor-pointer"
                  >
                    Next
                  </button>{' '}
                  <button
                    onClick={() => gotoPage(pageCount - 1)}
                    disabled={!canNextPage}
                    className="mx-2 rounded-circle font-bold flex items-center justify-center bg-primary h-[30px] w-[60px] cursor-pointer"
                  >
                    {'|>'}
                  </button>{' '}
                  <div className="flex flex-row justify-center w-full">
                    <span className="inline-block mx-2">
                      Page{' '}
                      <strong>
                        {pageIndex + 1} of {pageOptions.length}
                      </strong>{' '}
                    </span>
                    <span className="inline-block mx-2">
                      | Go to page:{' '}
                      <input
                        type="number"
                        className=" pl-2 outline-none border rounded-md border-primary"
                        defaultValue={pageIndex + 1}
                        onChange={(e) => {
                          const pageNumber = e.target.value
                            ? Number(e.target.value) - 1
                            : 0;
                          gotoPage(pageNumber);
                        }}
                        style={{ width: '50px' }}
                      />
                    </span>{' '}
                    <select
                      className="px-1/2 md:px-2 font-raleway rounded-md border border-primary"
                      value={pageSize}
                      onChange={(e) => setPageSize(Number(e.target.value))}
                    >
                      {[10, 25, 50].map((pageSize) => (
                        <option key={pageSize} value={pageSize}>
                          Show {pageSize}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      )}
    </>
  );
};

export default OperatorsTable;
