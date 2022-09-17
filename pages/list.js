
import Container from '@mui/material/Container';

import Table  from '../components/table'
import { Columns } from '../components/columns'
import Help  from '../components/help'
import React from 'react'
import 'regenerator-runtime/runtime';
import { useRouter } from 'next/router'
import { getWishlistDataUrl } from '../lib/url';

export default function List() {
  const [data, setData] = React.useState([]);
  const [shoppingCart, setShoppingCart] =  React.useState(new Set());
  const [column] = React.useState(Columns(shoppingCart, setShoppingCart));
  const router = useRouter();
  React.useEffect(() => {
    /* get wishlist data*/
    fetch(getWishlistDataUrl()).then(response => response.json()).then(setData);
  }, [router]);
  
  return (
    <>
      {data.length>0 && (<Container sx={{ padding:"0!important" }}>
          <div className="ReactTable">
            <Table columns={column} data={data} />
          </div>
      </Container>)}

      {data.length<=0 && (<Help/>)}
      </>
  )
}
