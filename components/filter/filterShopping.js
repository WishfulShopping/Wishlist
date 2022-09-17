

import { useRouter } from 'next/router'
import React from 'react'
import Box from '@mui/material/Box';
import {  useAsyncDebounce } from 'react-table'
import { getUrlParam, isReadWriteUrl } from '../../lib/url';
import Badge from '@mui/material/Badge';
import Checkbox from '@mui/material/Checkbox';

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import IconButton from '@mui/material/IconButton';
// Define a custom filter filter function!
export function filterShopping(rows, id, filterValue) {

    return rows.filter(row => {
      console.log(row.id)
      return typeof(filterValue) !== 'object' || filterValue.has(row.id);
    })
  }
  


// Define a default UI for filtering
export function ShoppingInput({shoppingCart, setShoppingCart, 
  column: { filterValue, preFilteredRows, setFilter },
}) {
  const cart=preFilteredRows.filter(item=>shoppingCart.has(item.id)).reduce((sum, item)=>sum+item.original.price, 0);
  
  const changeValue = useAsyncDebounce(value => {
    setFilter(value || undefined)
    setShoppingCart(new Set())
  }, 200)
  
  return (<>
  {cart>0 && <Box sx={ {
          margin: 0,
          top: 'auto',
          right: 20,
          bottom: 20,
          left: 'auto',
          position: 'fixed',
      }}>
        <IconButton aria-label="cart" onClick={()=> filterValue ? changeValue(undefined):changeValue((shoppingCart))} >
          <Badge badgeContent={`${Math.round(100*cart)/100}`.replace('.', "€")} color="secondary">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
      </Box>}
  </>
  )
}

// Custom component to render Title 
export function ShoppingCell({shoppingCart, setShoppingCart,row:{id}}) {
  return (<>
  <Checkbox checked={shoppingCart.has(id)} color="quinary" sx={{position:"absolute", marginLeft:"-1em", marginTop:"-1em", float:"left"}} title="Add to cart" className="hover-alternative-image" onChange={(e)=>{e.target.checked ? shoppingCart.add(id): shoppingCart.delete(id); setShoppingCart(new Set(Array.from(shoppingCart))) }}/>
  </>
  )
};
