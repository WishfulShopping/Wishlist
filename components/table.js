import React, { useState } from 'react'
import { useTable, useFilters, useGlobalFilter, useAsyncDebounce } from 'react-table'
// A great library for fuzzy filtering/sorting items
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

import { useRouter } from 'next/router'
import { Columns } from './columns'
import Row from './table/row'
import filterGreaterThan from './filter/filterGreaterThan'
import { Container } from '@mui/material';

// Define a default UI for filtering
function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
  const count = preGlobalFilteredRows.length
  const [value, setValue] = React.useState(globalFilter)
  const onChange = useAsyncDebounce(value => {
    setGlobalFilter(value || undefined)
  }, 200)

  return (
    <span>
      Search:{' '}
      <input
        value={value || ""}
        onChange={e => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`${count} records...`}
        style={{
          fontSize: '1.1rem',
          border: '0',
        }}
      />
    </span>
  )
}

// Define a default UI for filtering
function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter },
}) {
  const count = preFilteredRows.length

  return (<>
    <input
      value={filterValue || ''}
      onChange={e => {
        setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
      }}
      placeholder={`Search ${count} records...`}
    />
    <br/>
    <div className="col-4 mx-auto">
    <Button className="reset-button btn btn-secondary"  onClick={() => setFilter(undefined)}>Reset</Button>
    </div>
    </>
  )
}

function fuzzyTextFilterFn(rows, id, filterValue) {
  return rows;//matchSorter(rows, filterValue, { keys: [row => row.values[id]] })
}

// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = val => !val

// Our table component
export default function Table({ columns, data }) {
  const filterTypes = React.useMemo(
    () => ({
      // Add a new fuzzyTextFilterFn filter type.
      fuzzyText: fuzzyTextFilterFn,
      // Or, override the default text filter to use
      // "startWith"
      text: (rows, id, filterValue) => {
        return rows.filter(row => {
          const rowValue = row.values[id]
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true
        })
      },
    }),
    []
  )

  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter,
    }),
    []
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    visibleColumns,
    preGlobalFilteredRows,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      defaultColumn, // Be sure to pass the defaultColumn option
      filterTypes,
    },
    useFilters, // useFilters!
    useGlobalFilter // useGlobalFilter!
  )

  const productPerPage = 4*12;
  const [page, setPage] = useState(1);

  const router = useRouter();

  React.useEffect(() => {
    setPage(1)
  }, [router]);

  // We don't want to render all of the rows for this example, so cap
  // it for this use case
  const firstPageRows = rows.slice((page-1)*productPerPage, page * productPerPage)

  return (
    <>
      <Container {...getTableProps()}  sx={{ padding:"0!important"}}>
          {headerGroups.map(headerGroup => (
            <Container {...headerGroup.getHeaderGroupProps()} >
              {headerGroup.headers.map(column => (
                <Box {...column.getHeaderProps()} sx={{float:"left", paddingRight:'1em'}}>
                  {/*column.render('Header')*/}
                  {/* Render the columns filter UI */}
                  <div>{column.canFilter ? column.render('Filter') : null}</div>
                </Box>
              ))}
            </Container>
          ))}
          <Box sx={{clear:'both'}}/>
        <Container {...getTableBodyProps()} sx={{ padding:"0!important"}}>
          {firstPageRows.map((row, i) => {
            prepareRow(row)
            return <Row key={i} row={row}/>
          })}
        </Container>
      </Container>
      <Box sx={{clear:'both'}}/>
      <Box sx={{margin:'2em'}}>
        <Button disabled={page == 1} onClick={()=>{setPage(1); window.scrollTo(0, 0);}}>First</Button>
        <Button disabled={page-1==0} onClick={()=>{setPage(page-1); window.scrollTo(0, 0);}}>Previous</Button>
        Page {page} / {Math.round(rows.length/productPerPage) +1}
        <Button disabled={page*productPerPage>=rows.length} onClick={()=>{setPage(page+1); window.scrollTo(0, 0);}}>Next</Button>
      </Box>
    </>
  )
}
