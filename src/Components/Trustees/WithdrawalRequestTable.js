import React, {useMemo, useState} from 'react'
import {useTable, useGlobalFilter, usePagination} from 'react-table'
import ReactPaginate from 'react-paginate'
import {Table} from 'react-bootstrap'
import WithdrawSelect from './WithdrawSelect'

import {
  CgPushChevronLeft,
  CgChevronLeft,
  CgChevronRight,
  CgPushChevronRight,
} from 'react-icons/cg'

const WithdrawalRequestTable = () => {
  // select tag
  const [optionValue, setOptionValue] = useState('')
  const optionsFirst = [
    {value: 'Action', label: 'Action'},
    {value: 'Approved', label: 'Approved'},
  ]

  const MockData = [
    {
      id: 'Natasha Gamble',
      amount: '$64,833.1015',
      cooldown: '22:12',
      date: '03-09-2021 | 15:23:06',
      status: 'Active',
    },
    {
      id: 'Natasha Gamble',
      amount: '$64,833.1015',
      cooldown: '22:12',
      date: '03-09-2021 | 15:23:06',
      status: 'Active',
    },
    {
      id: 'Natasha Gamble',
      amount: '$64,833.1015',
      cooldown: '22:12',
      date: '03-09-2021 | 15:23:06',
      status: 'Paid',
    },
    {
      id: 'Natasha Gamble',
      amount: '$75,833.1015',
      cooldown: '22:12',
      date: '03-09-2021 | 15:23:06',
      status: 'Active',
    },
    {
      id: 'Natasha Gamble',
      amount: '$64,833.1015',
      cooldown: '22:12',
      date: '03-09-2021 | 15:23:06',
      status: 'Active',
    },
    {
      id: 'Natasha Gamble',
      amount: '$64,833.1015',
      cooldown: '22:12',
      date: '03-09-2021 | 15:23:06',
      status: 'Active',
    },
    {
      id: 'Natasha Gamble',
      amount: '$64,833.1015',
      cooldown: '22:12',
      date: '03-09-2021 | 15:23:06',
      status: 'Paid',
    },
    {
      id: 'Natasha Gamble',
      amount: '$64,833.1015',
      cooldown: '22:12',
      date: '03-09-2021 | 15:23:06',
      status: 'Active',
    },
    {
      id: 'Natasha Gamble',
      amount: '$64,833.1015',
      cooldown: '22:12',
      date: '03-09-2021 | 15:23:06',
      status: 'Paid',
    },
    {
      id: 'Natasha Gamble',
      amount: '$64,833.1015',
      cooldown: '22:12',
      date: '03-09-2021 | 15:23:06',
      status: 'Active',
    },
    {
      id: 'Natasha Gamble',
      amount: '$64,833.1015',
      cooldown: '22:12',
      date: '03-09-2021 | 15:23:06',
      status: 'Active',
    },
    {
      id: 'Natasha Gamble',
      amount: '$64,833.1015',
      cooldown: '22:12',
      date: '03-09-2021 | 15:23:06',
      status: 'Active',
    },
    {
      id: 'Natasha Gamble',
      amount: '$64,833.1015',
      cooldown: '22:12',
      date: '03-09-2021 | 15:23:06',
      status: 'Active',
    },
    {
      id: 'Natasha Gamble',
      amount: '$64,833.1015',
      cooldown: '22:12',
      date: '03-09-2021 | 15:23:06',
      status: 'Active',
    },
    {
      id: 'Natasha Gamble',
      amount: '$64,833.1015',
      cooldown: '22:12',
      date: '03-09-2021 | 15:23:06',
      status: 'Active',
    },
    {
      id: 'Natasha Gamble',
      amount: '$64,833.1015',
      cooldown: '22:12',
      date: '03-09-2021 | 15:23:06',
      status: 'Active',
    },
    {
      id: 'Natasha Gamble',
      amount: '$64,833.1015',
      cooldown: '22:12',
      date: '03-09-2021 | 15:23:06',
      status: 'Active',
    },
    {
      id: 'Natasha Gamble',
      amount: '$64,833.1015',
      cooldown: '22:12',
      date: '03-09-2021 | 15:23:06',
      status: 'Active',
    },
    {
      id: 'Natasha Gamble',
      amount: '$64,833.1015',
      cooldown: '22:12',
      date: '03-09-2021 | 15:23:06',
      status: 'Active',
    },
    {
      id: 'Natasha Gamble',
      amount: '$64,833.1015',
      cooldown: '22:12',
      date: '03-09-2021 | 15:23:06',
      status: 'Active',
    },
    {
      id: 'Natasha Gamble',
      amount: '$64,833.1015',
      cooldown: '22:12',
      date: '03-09-2021 | 15:23:06',
      status: 'Active',
    },
    {
      id: 'Natasha Gamble',
      amount: '$64,833.1015',
      cooldown: '22:12',
      date: '03-09-2021 | 15:23:06',
      status: 'Active',
    },
    {
      id: 'Natasha Gamble',
      amount: '$64,833.1015',
      cooldown: '22:12',
      date: '03-09-2021 | 15:23:06',
      status: 'Active',
    },
    {
      id: 'Natasha Gamble',
      amount: '$64,833.1015',
      cooldown: '22:12',
      date: '03-09-2021 | 15:23:06',
      status: 'Active',
    },
  ]
  const COLUMNS = [
    {
      Header: 'Investor',
      accessor: 'id',
    },
    {
      Header: 'Amount',
      accessor: 'amount',
    },
    {
      Header: 'Date',
      accessor: 'date',
    },
    {
      Header: 'Cooldown',
      accessor: 'cooldown',
      Cell: ({value}) => <div className='gradient__circle'>{value}</div>,
    },
    {
      Header: 'Action',
      accessor: 'action',
      Cell: ({value}) => (
        <WithdrawSelect
          optionValue={optionValue}
          setOptionValue={setOptionValue}
          options={optionsFirst}
        />
      ),
    },
  ]

  const columns = useMemo(() => COLUMNS, [])
  const data = useMemo(() => MockData, [])

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    usePagination
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    state,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    setPageSize,
    pageCount,
  } = tableInstance
  const {pageIndex, pageSize} = state

  const handlePageClick = (data) => {
    gotoPage(data.selected)
  }

  return (
    <div>
      <Table className='loan__table' responsive {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </Table>
      <div className='table__bottom'>
        <div className='table__bottom__left'>
          <p className='showing'>
            <br />
            Showing{' '}
            <span className='txt__black'>
              {pageIndex * pageSize + 1}
            </span> to{' '}
            <span className='txt__black'>
              {pageSize * (pageIndex + 1) > MockData.length
                ? MockData.length
                : pageSize * (pageIndex + 1)}
            </span>{' '}
            of <span className='txt__black'>{MockData.length}</span> elements
          </p>
        </div>
        <div className='table__bottom__right'>
          <button
            className={!canPreviousPage ? 'btn__disabled' : ''}
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
          >
            <CgPushChevronLeft />
          </button>
          <button
            className={!canPreviousPage ? 'btn__disabled' : ''}
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
          >
            <CgChevronLeft />
          </button>
          <ReactPaginate
            previousLabel={false}
            nextLabel={false}
            breakLabel={'...'}
            breakClassName={'break-me'}
            pageCount={pageOptions.length}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={handlePageClick}
            containerClassName={'pagination'}
            activeClassName={'circle__active'}
          />
          <button
            className={!canNextPage ? 'btn__disabled' : ''}
            onClick={() => nextPage()}
            disabled={!canNextPage}
          >
            <CgChevronRight />
          </button>
          <button
            className={!canNextPage ? 'btn__disabled' : ''}
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          >
            <CgPushChevronRight />
          </button>
        </div>
      </div>
    </div>
  )
}

export default WithdrawalRequestTable
