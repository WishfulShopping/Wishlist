import * as React from 'react';
import Box from '@mui/material/Box';
import { uid } from 'uid/secure';
import Link from '../src/Link';

export default function Index() {
  const [id, setId] = React.useState("");

  React.useEffect(() => {
    setId(uid(32));
  }, []);
  return (
    <Box minHeight="80vh" display="flex" justifyContent="center" alignItems="center">
      {id.length && (
        <Link href={`list/${id}`} color="secondary">
          + Create a new wishlist
        </Link>
      )}
    </Box>
  );
}
