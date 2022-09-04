
import { useDrop } from 'react-dnd'
import React from 'react'
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Link from '../../src/Link';
import EvenIcon from '@mui/icons-material/NewspaperOutlined';
import OddIcon from '@mui/icons-material/NewspaperSharp';
import PlusOne from '@mui/icons-material/Add';
import theme from '../../src/theme';

export default function Item({url, item, index}) {
    
  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: 'row',
      drop: (state) => fetch(`${window.location.toString().replace('/list', '/api/copy')}/${state.id}?to=${url.replace('/list/', '')}`).then(()=>window.location=url),
      collect: (monitor) => ({
        isOver: !!monitor.isOver()
      })
    }),
    [url]
  )

    return (
      <ListItem key={index} ref={drop} disablePadding sx={{ display: 'block' }}>
        <ListItemButton
          sx={{
            minHeight: 48,
            justifyContent: open ? 'initial' : 'center',
            px: 2.5,
          }}
          component={Link} 
          to={url}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 3 : 'auto',
              justifyContent: 'center',
            }}
          >
            {isOver ? <PlusOne/> : index % 2 === 0 ? <EvenIcon /> : <OddIcon />}
          </ListItemIcon>
          <ListItemText primary={item || url.replace('/list/', '')} sx={{ opacity: open ? 1 : 0 }} />
        </ListItemButton>
        {isOver && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: '100%',
            zIndex: 1,
            opacity: 0.5,
            backgroundColor: theme.palette.quaternary.main,
          }}
        ></div>)}
      </ListItem>
    )
  }
  