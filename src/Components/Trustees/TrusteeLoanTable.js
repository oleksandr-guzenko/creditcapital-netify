import React, {useMemo, useState} from 'react'
import {useTable, useGlobalFilter, usePagination} from 'react-table'
import ReactPaginate from 'react-paginate'
import {Table} from 'react-bootstrap'
import {
  CgPushChevronLeft,
  CgChevronLeft,
  CgChevronRight,
  CgPushChevronRight,
} from 'react-icons/cg'
import GlobalFilter from '../LandingPage/GlobalFilter'
import WithdrawSelect from './WithdrawSelect'

import {BsPencilSquare} from 'react-icons/bs'
import NewLoanForm from './NewLoanForm'

const TrusteeLoanTable = () => {
  // select tag
  const [optionValue, setOptionValue] = useState('')
  const optionsSelect = [
    {value: 'Action', label: 'Action'},
    {value: 'Approved', label: 'Approved'},
  ]

  const MockData = [
    {
      id: '0x4e5....c542s1',
      edit: 'true',
      amount: '$64,833.1015',
      borrower: 'Jhon Doe',
      sector: 'Add Liquidity',
      approvedDate: '03-09-2021',
      status: 'Active',
    },
    {
      id: '0x4e5....c542s1',
      edit: 'true',
      amount: '$64,833.1015',
      borrower: 'Jhon Doe',
      sector: 'Add Liquidity',
      approvedDate: '03-09-2021',
      status: 'Active',
    },
    {
      id: '0x4e5....c542s1',
      edit: 'true',
      amount: '$64,833.1015',
      borrower: 'Jhon Doe',
      sector: 'Add Liquidity',
      approvedDate: '03-09-2021',
      status: 'Paid',
    },
    {
      id: '0x4e5....c542s1',
      edit: 'true',
      amount: '$75,833.1015',
      borrower: 'Jhon Doe',
      sector: 'Add Liquidity',
      approvedDate: '03-09-2021',
      status: 'Active',
    },
    {
      id: '0x4e5....c542s1',
      edit: 'true',
      amount: '$64,833.1015',
      borrower: 'Jhon Doe',
      sector: 'Add Liquidity',
      approvedDate: '03-09-2021',
      status: 'Active',
    },
    {
      id: '0x4e5....c542s1',
      edit: 'true',
      amount: '$64,833.1015',
      borrower: 'Jhon Doe',
      sector: 'Add Liquidity',
      approvedDate: '03-09-2021',
      status: 'Active',
    },
    {
      id: '0x4e5....c542s1',
      edit: 'true',
      amount: '$64,833.1015',
      borrower: 'Jhon Doe',
      sector: 'Add Liquidity',
      approvedDate: '03-09-2021',
      status: 'Paid',
    },
    {
      id: '0x4e5....c542s1',
      edit: 'true',
      amount: '$64,833.1015',
      borrower: 'Jhodfvn Doe',
      sector: 'Add Liquidity',
      approvedDate: '03-09-2021',
      status: 'Active',
    },
    {
      id: '0x4e5....c542s1',
      edit: 'true',
      amount: '$64,833.1015',
      borrower: 'Jhscson Doe',
      sector: 'Add Liquidity',
      approvedDate: '03-09-2021',
      status: 'Paid',
    },
    {
      id: '0x4e5....c542s1',
      edit: 'true',
      amount: '$64,833.1015',
      borrower: 'Jhon Doe',
      sector: 'Add Liquidity',
      approvedDate: '03-09-2021',
      status: 'Active',
    },
    {
      id: '0x4e5....c542s1',
      edit: 'true',
      amount: '$64,833.1015',
      borrower: 'Jhon Doe',
      sector: 'Add Liquidity',
      approvedDate: '03-09-2021',
      status: 'Active',
    },
    {
      id: '0x4e5....c542s1',
      edit: 'true',
      amount: '$64,833.1015',
      borrower: 'Jhon Doe',
      sector: 'Add Liquidity',
      approvedDate: '03-09-2021',
      status: 'Active',
    },
    {
      id: '0x4e5....c542s1',
      edit: 'true',
      amount: '$64,833.1015',
      borrower: 'Jhon Doe',
      sector: 'Add Liquidity',
      approvedDate: '03-09-2021',
      status: 'Active',
    },
    {
      id: '0x4e5....c542s1',
      edit: 'true',
      amount: '$64,833.1015',
      borrower: 'Jhon Doe',
      sector: 'Add Liquidity',
      approvedDate: '03-09-2021',
      status: 'Active',
    },
    {
      id: '0x4e5....c542s1',
      edit: 'true',
      amount: '$64,833.1015',
      borrower: 'Jhon Doe',
      sector: 'Add Liquidity',
      approvedDate: '03-09-2021',
      status: 'Active',
    },
    {
      id: '0x4e5....c542s1',
      edit: 'true',
      amount: '$64,833.1015',
      borrower: 'Jhon Doe',
      sector: 'Add Liquidity',
      approvedDate: '03-09-2021',
      status: 'Active',
    },
    {
      id: '0x4e5....c542s1',
      edit: 'true',
      amount: '$64,833.1015',
      borrower: 'Jhon Doe',
      sector: 'Add Liquidity',
      approvedDate: '03-09-2021',
      status: 'Active',
    },
    {
      id: '0x4e5....c542s1',
      edit: 'true',
      amount: '$64,833.1015',
      borrower: 'Jhon Doe',
      sector: 'Add Liquidity',
      approvedDate: '03-09-2021',
      status: 'Active',
    },
    {
      id: '0x4e5....c542s1',
      edit: 'true',
      amount: '$64,833.1015',
      borrower: 'Jhon Doe',
      sector: 'Add Liquidity',
      approvedDate: '03-09-2021',
      status: 'Active',
    },
    {
      id: '0x4e5....c542s1',
      edit: 'true',
      amount: '$64,833.1015',
      borrower: 'Jhon Doe',
      sector: 'Add Liquidity',
      approvedDate: '03-09-2021',
      status: 'Active',
    },
    {
      id: '0x4e5....c542s1',
      edit: 'true',
      amount: '$64,833.1015',
      borrower: 'Jhon Doe',
      sector: 'Add Liquidity',
      approvedDate: '03-09-2021',
      status: 'Active',
    },
    {
      id: '0x4e5....c542s1',
      edit: 'true',
      amount: '$64,833.1015',
      borrower: 'Jhon Doe',
      sector: 'Add Liquidity',
      approvedDate: '03-09-2021',
      status: 'Active',
    },
    {
      id: '0x4e5....c542s1',
      edit: 'true',
      amount: '$64,833.1015',
      borrower: 'Jhon Doe',
      sector: 'Add Liquidity',
      approvedDate: '03-09-2021',
      status: 'Active',
    },
    {
      id: '0x4e5....c542s1',
      edit: 'true',
      amount: '$64,833.1015',
      borrower: 'Jhon Doe',
      sector: 'Add Liquidity',
      approvedDate: '03-09-2021',
      status: 'Active',
    },
  ]
  const COLUMNS = [
    {
      Header: 'Loan ID',
      accessor: 'id',
    },
    {
      Header: 'Amount',
      accessor: 'amount',
    },
    {
      Header: 'Borrower',
      accessor: 'borrower',
    },
    {
      Header: 'Sector',
      accessor: 'sector',
    },
    {
      Header: 'Approved date',
      accessor: 'approvedDate',
    },
    {
      Header: 'Status',
      accessor: 'status',
      Cell: ({value}) => (
        <WithdrawSelect
          optionValue={optionValue}
          setOptionValue={setOptionValue}
          options={optionsSelect}
        />
      ),
    },
    {
      Header: '',
      accessor: 'edit',
      Cell: () => <BsPencilSquare />,
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
    setGlobalFilter,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    setPageSize,
    pageCount,
  } = tableInstance
  const {globalFilter, pageIndex, pageSize} = state

  const handlePageClick = (data) => {
    gotoPage(data.selected)
  }

  // select

  const optionsFirst = [
    {value: '', label: 'All'},
    {value: 'Remove Liquidity', label: 'Remove Liquidity'},
    {value: 'Add Liquidity', label: 'Add Liquidity'},
  ]

  const optionsSecond = [
    {value: '', label: 'All'},
    {value: 'Active', label: 'Active'},
    {value: 'Paid', label: 'Paid'},
  ]

  //   New Loan Modal

  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  return (
    <>
      <div className='d-flex flex-wrap align-items-center justify-content-between'>
        <div className='global__filter w-100'>
          <GlobalFilter
            filter={globalFilter}
            setFilter={setGlobalFilter}
            options={optionsFirst}
            label='Select Sector'
          />
          <GlobalFilter
            filter={globalFilter}
            setFilter={setGlobalFilter}
            options={optionsSecond}
            label='Select Status'
          />
        </div>
        <button className='btn_brand' onClick={handleShow}>
          Add New Loan
        </button>
      </div>
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
      <NewLoanForm show={show} handleClose={handleClose} />
    </>
  )
}

export default TrusteeLoanTable
