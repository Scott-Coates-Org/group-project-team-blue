import React, { useMemo } from 'react'
import datasource from '../datasource.json'
import { COLUMNS } from './columns'
import { useTable, useSortBy, useGlobalFilter, usePagination } from 'react-table'
import "./BookingList.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons'
import BookingView from './BookingView';
import { ButtonGroup, Button, ButtonToolbar } from 'reactstrap'

export default function BookingList() {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => datasource, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    pageCount,
    setPageSize,
    prepareRow,
    state,
    setGlobalFilter
  } = useTable({
    columns,
    data
  }, useGlobalFilter, useSortBy, usePagination);

  const { globalFilter, pageIndex, pageSize } = state;


  return (
    <>
    <BookingView filter={globalFilter} setFilter={setGlobalFilter}/>
    <div className="d-flex justify-content-start mb-5">
      <div className="mr-5">
        <h5 className="mb-0">$ 100,000</h5>
        <span>Sales</span>
      </div>
      <div>
        <h5 className="mb-0">435</h5>
        <span>Tickets</span>
      </div>
    </div>
    <table className="mytable" {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => {
          return (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => {
              return (
              <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                {column.render('Header')}
                <span>
                  {column.isSorted ? (column.isSortedDesc ? <FontAwesomeIcon icon={faArrowDown}/> : <FontAwesomeIcon icon={faArrowUp}/>) : ""}
                </span>
              </th>
              )
            })}
            
          </tr>
          )
        })}
        
      </thead>
      <tbody {...getTableBodyProps()}>
        {page.map(row => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return(
                <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                )
              })}
              
            </tr>
          )
        })}
        
      </tbody>
    </table>
    <div className='d-flex justify-content-between mt-1'>
      <ButtonToolbar>
        <ButtonGroup>
          {[5,10,15].map((pageSize) => {
            return (
              <Button className="btn-light border " onClick={() => setPageSize(pageSize)}>{pageSize}</Button>
            )
          })}
        </ButtonGroup>
      </ButtonToolbar>
      <span className="mr-3">
        Go to Page {" "}
        <input type="number" defaultValue={pageIndex + 1} style={{width: 40}}
          onChange={(e) => {
            const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0
            gotoPage(pageNumber)
          }}/>
      </span>
      <div>
        <span>
          Page {" "}<strong>{pageIndex +1 } of {pageOptions.length}</strong>
        </span>
        <ButtonGroup className="ml-2">
          <Button className="btn-light border" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
            {"<<"}
          </Button>
          <Button className="btn-light border" onClick={() => previousPage()} disabled={!canPreviousPage}>
            Prev
          </Button>
          <Button className="btn-light border"onClick={() => nextPage()} disabled={!canNextPage}>
            Next
          </Button>
          <Button className="btn-light border " onClick={() => gotoPage(pageCount-1)} disabled={!canNextPage}>
            {">>"}
          </Button>
        </ButtonGroup>
        </div>
    </div>
    </>
  )
}