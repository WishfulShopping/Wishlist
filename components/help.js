
import * as React from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Image from 'next/image'


export default function Help() {
  return (<>
  <Container >
  <Typography sx={{position:"relative", margin:"auto"}}>
        {'No entries'}
        </Typography>
        </Container>
        <Container>
          <Box sx={{float:"left", margin:"1rem"}}> 
    <Typography sx={{position:"relative"}}>
        {'Install the bookmark in browser'}
        </Typography>
        <Image
          src="/help_start.png"
          alt="Install as bookmark"
          width="400rem"
          height="400rem"
        />
        </Box>
        <Box sx={{float:"left", margin:"1rem"}}> 
        <Typography sx={{position:"relative"}}>
      {'Activate it on your favorite product while browsing internet'}
      </Typography>
        <Image
          src="/help_use.png"
          alt="Use it on the web"
          width="400rem"
          height="400rem"
        />
        </Box>
      </Container>
    </>
  );
}
