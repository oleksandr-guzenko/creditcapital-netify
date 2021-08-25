import React, {useMemo} from 'react'
import {useTable, useGlobalFilter, usePagination} from 'react-table'
import ReactPaginate from 'react-paginate'
import {Table} from 'react-bootstrap'
import GlobalFilter from './GlobalFilter'
import {
  CgPushChevronLeft,
  CgChevronLeft,
  CgChevronRight,
  CgPushChevronRight,
} from 'react-icons/cg'

const LiquidityTable = () => {
  const MockData = [
    {
      id: '0x4e59664s5df5cs65542s1bshdawd654478qes',
      action: 'Add Liquidity',
      liquidityAmount: '648 USDC',
      date: '10-06-2021 | 08:45:12',
    },
    {
      id: '0x4e59664s5df5cs65542s1bshdawd654478qes',
      action: 'Remove Liquidity',
      liquidityAmount: '648 USDC',
      date: '10-06-2021 | 08:45:12',
    },
    {
      id: '0x4e59664s5df5cs65542s1bshdawd654478qes',
      action: 'Add Liquidity',
      liquidityAmount: '648 USDC',
      date: '10-06-2021 | 08:45:12',
    },
    {
      id: '0x4e59664s5df5cs65542s1bshdawd654478qes',
      action: 'Remove Liquidity',
      liquidityAmount: '648 USDC',
      date: '10-06-2021 | 08:45:12',
    },
    {
      id: '0x4e59664s5df5cs65542s1bshdawd654478qes',
      action: 'Add Liquidity',
      liquidityAmount: '648 USDC',
      date: '10-06-2021 | 08:45:12',
    },
    {
      id: '0x4e59664s5df5cs65542s1bshdawd654478qes',
      action: 'ac Liquidity',
      liquidityAmount: '648 USDC',
      date: '10-06-2021 | 09:45:12',
    },
    {
      id: 'efe',
      action: 'Adacd Liquidity',
      liquidityAmount: '648 USDC',
      date: '10-06-2021 | 08:45:12',
    },
    {
      id: 'wefwe78qes',
      action: 'Remove Liquidity',
      liquidityAmount: '648 USDC',
      date: '10-06-2021 | 08:45:12',
    },
    {
      id: '0x4e59664s5df5cs65542s1bshdawd654478qes',
      action: 'Add Liquiefedity',
      liquidityAmount: '648 USDC',
      date: '10-06-2021 | 08:45:12',
    },
    {
      id: 'wefwefewfwe',
      action: 'Remove Liquidity',
      liquidityAmount: '648 USDC',
      date: '10-06-2021 | 08:45:12',
    },
    {
      id: 'wfewfew',
      action: 'Add Liquidity',
      liquidityAmount: '648 USDC',
      date: '10-06-2021 | 08:45:12',
    },
    {
      id: '0x4e59664s5df5cs65542s1bshdawd654478qes',
      action: 'Remove Liquidity',
      liquidityAmount: '648 USDC',
      date: '10-06-2021 | 08:45:12',
    },
    {
      id: '0x4e5966xc cx 4s5df5cs65542s1bshdawd654478qes',
      action: 'Add Liquidity',
      liquidityAmount: '648 USDC',
      date: '10-06-2021 | 08:45:12',
    },
    {
      id: '0x4e59664s5df5cs65542s1bshdawd654478qes',
      action: 'Remove Liquidity',
      liquidityAmount: '648 USDC',
      date: '10-06-2021 | 08:45:12',
    },
    {
      id: '0x4e59664s5dx cx cxsdvdsvsf5cs65542s1bshdawd654478qes',
      action: 'Add Liquidity',
      liquidityAmount: '648 USDC',
      date: '10-06-2021 | 08:45:12',
    },
    {
      id: 'sdvsdvsdvdsvds',
      action: 'Remove Liquidity',
      liquidityAmount: '648 USDC',
      date: '10-06-2021 | 08:45:12',
    },
    {
      id: '0x4e59664s5df5cs65542s1bshdawd654478qes',
      action: 'Add Liquidity',
      liquidityAmount: '648 USDC',
      date: '10-06-2021 | 08:45:12',
    },
    {
      id: '0x4e5966sdvsd4s5df5cs65542s1bshdawd654478qes',
      action: 'Remsvdsvsdove Liquidity',
      liquidityAmount: '648 USDC',
      date: '10-06-2021 | 08:45:12',
    },
    {
      id: '0x4e59664s5df5cs65542s1bshdawd654478qes',
      action: 'Add Liquidity',
      liquidityAmount: '648 USDC',
      date: '10-06-2021 | 08:45:12',
    },
    {
      id: '0x4e59664s5df5cs65542s1bshdawd654478qes',
      action: 'Remove Liquidity',
      liquidityAmount: '648 USDC',
      date: '10-06-2021 | 08:45:12',
    },
    {
      id: '0x4e59664s5df5cs65542s1bshdawd654478qes',
      action: 'Add Liquidity',
      liquidityAmount: '648 USDC',
      date: '10-06-2021 | 08:45:12',
    },
    {
      id: '0x4e59664s5df5cs65542s1bshdawd654478qes',
      action: 'Remove Liquidity',
      liquidityAmount: '648 USDC',
      date: '10-06-2021 | 08:45:12',
    },
    {
      id: '0x4e59664s5df5cs65542s1bshdawd654478qes',
      action: 'Add Liquidity',
      liquidityAmount: '648 USDC',
      date: '10-06-2021 | 08:45:12',
    },
    {
      id: '0x4e59664s5df5cs65542s1bshdawd654478qes',
      action: 'Remove Liquidity',
      liquidityAmount: '648 USDC',
      date: '10-06-2021 | 08:45:12',
    },
    {
      id: '0x4e59664s5df5cs65542s1bshdawd654478qes',
      action: 'Add Liquidity',
      liquidityAmount: '648 USDC',
      date: '10-06-2021 | 08:45:12',
    },
    {
      id: '0x4e59664s5df5cs65542s1bshdawd654478qes',
      action: 'Remove Liquidity',
      liquidityAmount: '648 USDC',
      date: '10-06-2021 | 08:45:12',
    },
    {
      id: '0x4e59664s5df5cs65542s1bshdawd654478qes',
      action: 'Add Liquidity',
      liquidityAmount: '648 USDC',
      date: '10-06-2021 | 08:45:12',
    },
    {
      id: '0x4e59664s5df5cs65542s1bshdawd654478qes',
      action: 'Remove Liquidity',
      liquidityAmount: '648 USDC',
      date: '10-06-2021 | 08:45:12',
    },
    {
      id: '0x4e59664s5df5cs65542s1bshdawd654478qes',
      action: 'Add Liquidity',
      liquidityAmount: '648 USDC',
      date: '10-06-2021 | 08:45:12',
    },
    {
      id: '0x4e59664s5df5cs65542s1bshdawd654478qes',
      action: 'Remove Liquidity',
      liquidityAmount: '648 USDC',
      date: '10-06-2021 | 08:45:12',
    },
    {
      id: '0x4e59664s5df5cs65542s1bshdawd654478qes',
      action: 'Add Liquidity',
      liquidityAmount: '648 USDC',
      date: '10-06-2021 | 08:45:12',
    },
    {
      id: '0x4e59664s5df5cs65542s1bshdawd654478qes',
      action: 'Remove Liquidity',
      liquidityAmount: '648 USDC',
      date: '10-06-2021 | 08:45:12',
    },
    {
      id: '0x4e59664s5df5cs65542s1bshdawd654478qes',
      action: 'Add Liquidity',
      liquidityAmount: '648 USDC',
      date: '10-06-2021 | 08:45:12',
    },
    {
      id: '0x4e59664s5df5cs65542s1bshdawd654478qes',
      action: 'Remove Liquidity',
      liquidityAmount: '648 USDC',
      date: '10-06-2021 | 08:45:12',
    },
    {
      id: '0x4e59664s5df5cs65542s1bshdawd654478qes',
      action: 'Add Liquidity',
      liquidityAmount: '648 USDC',
      date: '10-06-2021 | 08:45:12',
    },
    {
      id: '0x4e59664s5df5cs65542s1bshdawd654478qes',
      action: 'Remove Liquidity',
      liquidityAmount: '648 USDC',
      date: '10-06-2021 | 08:45:12',
    },
    {
      id: '0x4e59664s5df5cs65542s1bshdawd654478qes',
      action: 'Add Liquidity',
      liquidityAmount: '648 USDC',
      date: '10-06-2021 | 08:45:12',
    },
    {
      id: '0x4e59664s5df5cs65542s1bshdawd654478qes',
      action: 'Remove Liquidity',
      liquidityAmount: '648 USDC',
      date: '10-06-2021 | 08:45:12',
    },
    {
      id: '0x4e59664s5df5cs65542s1bshdawd654478qes',
      action: 'Add Liquidity',
      liquidityAmount: '648 USDC',
      date: '10-06-2021 | 08:45:12',
    },
    {
      id: '0x4e59664s5df5cs65542s1bshdawd654478qes',
      action: 'Remove Liquidity',
      liquidityAmount: '648 USDC',
      date: '10-06-2021 | 08:45:12',
    },
  ]
  const COLUMNS = [
    {
      Header: 'Transaction Id',
      accessor: 'id',
    },
    {
      Header: 'Action',
      accessor: 'action',
    },
    {
      Header: 'Add Liquidity amount',
      accessor: 'liquidityAmount',
    },
    {
      Header: 'Date',
      accessor: 'date',
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

  const options = [
    {value: '', label: 'All'},
    {value: 'Remove Liquidity', label: 'Remove Liquidity'},
    {value: 'Add Liquidity', label: 'Add Liquidity'},
  ]

  return (
    <div>
      <div className='global__filter'>
        <GlobalFilter
          filter={globalFilter}
          setFilter={setGlobalFilter}
          options={options}
          label='Action'
        />
      </div>
      <Table responsive {...getTableProps()}>
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
            <span className='txt__black'>{pageSize * (pageIndex + 1)}</span> of{' '}
            <span className='txt__black'>{MockData.length}</span> elements
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

export default LiquidityTable
