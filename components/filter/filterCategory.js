

import { useRouter } from 'next/router'
import { useState } from 'react'
import React from 'react'
import {  useAsyncDebounce } from 'react-table'
import { getUrlParam } from '../../lib/url';
import Chip from '@mui/material/Chip';
// Define a custom filter filter function!
export function filterCategory(rows, id, filterValue) {

    return rows.filter(row => {
      if (filterValue) {
        if (filterValue== "_" && typeof(row.original.category) != "undefined") {
          return false;
        }
        if (filterValue != "_" && filterValue != row.original.category) {//TODO logo
          return false;
        }
      }
      return true;
    })
  }
  


// Define a default UI for filtering
export function CategoryInput({
  column: { filterValue, preFilteredRows, setFilter },
}) {
  const count = preFilteredRows.length
  const router = useRouter();

  React.useEffect(() => {
    const params = getUrlParam();
    if (params.category) {
      changeValue(params.category);
    }
  }, [router]);

  const changeValue = useAsyncDebounce(value => {
    setFilter(value || undefined)
  }, 200)

  return (<></>
  )
}

// Custom component to render Title 
export function CategoryCell({row:{original}}) {
  const router = useRouter();
  const [show, setShow] = useState(false);
  React.useEffect(() => {
    const params = getUrlParam();
    setShow(params?.category ? false : true);
  }, [router]);
  if (show && original.category) {
    return (<Chip title={original.category} label={original.category.substring(0,1)} size="small" color="success" style={{float:"right", margin:1}}/>);
  }
  return (<></>);
};
