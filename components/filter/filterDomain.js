
import React, { useState } from 'react'

import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Button from '@mui/material/Button';
// Define a custom filter filter function!
export function filterDomain(rows, id, filterValue) {
    return rows.filter(row => {
      return [row.original.logo, row.original.image, row.original.url].some(item=>(new RegExp( '\\b' + filterValue.join('\\b|\\b') + '\\b') ).test(item))
    })
  }
  


// This is a custom filter UI for selecting
// a unique option from a list
export function FaviconColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id },
}) {
  // Calculate the options for filtering
  // using the preFilteredRows
  const options = React.useMemo(() => {
    const options = new Set();
    preFilteredRows.forEach(row => {
      [row.original["url"], row.original["logo"]].forEach((option) => { 
      if (option && option.length) {
        const { hostname } = new URL(option);
        options.add(hostname.split(".").splice(-2).join("."))
      }});
    })
    return [...Array.from(options.values())]
  }, [id, preFilteredRows])

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setFilter(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  // Render a multi-select box
  return (
      <div>
        <FormControl sx={{ m: 1, width:"7em"}}>
          <InputLabel id="demo-multiple-name-label">Website</InputLabel>
          <Select
            labelId="demo-multiple-name-label"
            id="demo-multiple-name"
            multiple
            value={filterValue||[]}
            onChange={handleChange}
            input={<OutlinedInput label="Name" />}
          >
            {options.map((name) => (
              <MenuItem
                key={name}
                value={name}
              >
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button className="reset-button btn btn-secondary" onClick={() => setFilter(undefined)}>Reset</Button>
      </div>
  )
}