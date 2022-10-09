import * as React from 'react';
import Box from '@mui/material/Box';
import Link from '../src/Link';

export default function Index() {

  return (
    <Box minHeight="80vh" display="flex" justifyContent="center" alignItems="center">
      <Link href={`api/create`} color="secondary">
        + Create a new wishlist
      </Link>
    </Box>
  );
}
