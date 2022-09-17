
import React from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

export default function Pager({page, setPage, rows, productPerPage}) {

    return (
      <Box sx={{margin:'2em', fontSize:'0.8rem'}}>
        <Button  sx={{maxWidth: '1em', maxHeight: '1em', minWidth: '1em', minHeight: '1em'}} disabled={page == 1} onClick={()=>{setPage(1); window.scrollTo(0, 0);}}>&lt;&lt;</Button>
        <Button  sx={{maxWidth: '2em', maxHeight: '1em', minWidth: '2em', minHeight: '1em'}} disabled={page-1==0} onClick={()=>{setPage(page-1); window.scrollTo(0, 0);}}>&lt;</Button>
        Page {page} / {Math.round(rows.length/productPerPage) +1}
        <Button sx={{maxWidth: '2em', maxHeight: '1em', minWidth: '2em', minHeight: '1em'}}  disabled={page*productPerPage>=rows.length} onClick={()=>{setPage(page+1); window.scrollTo(0, 0);}}>&gt;</Button>
        <Button sx={{maxWidth: '1em', maxHeight: '1em', minWidth: '1em', minHeight: '1em'}}  disabled={page*productPerPage>=rows.length} onClick={()=>{setPage(Math.ceil(rows.length/productPerPage)); window.scrollTo(0, 0);}}>&gt;&gt;</Button>
      </Box>
    )
  }
  