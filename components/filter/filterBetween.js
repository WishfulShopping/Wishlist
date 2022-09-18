
import React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';
// Define a custom filter filter function!
export function filterBetween(rows, id, filterValue) {
    return rows.filter(row => {
      const rowValue = row.values[id];

      if (filterValue) {
        if (filterValue.min && rowValue < filterValue.min) {
          return false;
        }
        if (filterValue.max && filterValue.max < rowValue) {
          return false;
        }
      }
      return true;
    })
  }
  

// This is a custom filter UI that uses a
// slider to set the filter value between a column's
// min and max values
export function DoubleSliderColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id },
}) {
  // Calculate the min and max
  // using the preFilteredRows

  const [min, max] = React.useMemo(() => {
    let min = preFilteredRows.length ? preFilteredRows[0].values[id] : 0
    let max = preFilteredRows.length ? preFilteredRows[0].values[id] : 100
    preFilteredRows.forEach(row => {
      min = Math.min(row.values[id], min)
      max = Math.max(row.values[id], max)
    })
    return [Math.floor(min), Math.ceil(max)]
  }, [id, preFilteredRows])


  const handleChange = (event, newValue, activeThumb) => {
    filterValue = {
      min : newValue[0],
      max : newValue[1]
    }
    setFilter(filterValue);
  };

  return (
    <>
      <Box sx={{ width: {md:'30rem', sm:'20rem' }}}>
      <Slider
        getAriaLabel={() => 'Price'}
        value={[filterValue?.min||min, filterValue?.max||max]}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={(v)=>v}
        disableSwap
        defaultValue={[min, max]}
        step={Math.min(1, Math.round((max-min)/10))}
        min={min}
        max={max}
      />
    </Box>
      <Button className="reset-button-left btn btn-secondary" onClick={() => setFilter(undefined)}>Reset {filterValue?.min} {filterValue?'€ -':''} {filterValue?.max} {filterValue?'€':''}</Button>
    </>
  )
}