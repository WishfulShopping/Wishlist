
import Container from '@mui/material/Container';

import Row from '@mui/material/TableRow';
import Table  from '../components/table'
import { Columns } from '../components/columns'
import React from 'react'
import 'regenerator-runtime/runtime';
import { useRouter } from 'next/router'

export default function List() {
  const [data, setData] = React.useState([]);
  const [column] = React.useState(Columns);
  const router = useRouter();
  React.useEffect(() => {
    /* get wishlist data*/
    fetch(window.location.toString().replace('/list', '/api/hello')).then(response => response.json()).then(setData);

  }, [router]);
  
  return (
    <>     
      
      {data.length>0 && (<Container>
        <Row>
          <div className="ReactTable">
            <Table columns={column} data={data} />
          </div>
        </Row>
      </Container>)}
      </>
  )
}
