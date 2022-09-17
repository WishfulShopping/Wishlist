
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
import { useRouter } from 'next/router'
import { Typography } from '@mui/material';
import { isWishlistSelected } from '../../lib/url';

export default function Item({url, item, type}) {
    
  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: 'row',
      drop: ([id, baseUrl, setCompleted]) => {
        fetch(`${baseUrl.replace('/list', '/api/copy').split('?')[0]}/${id}?to=${url.replace('/list/', '').replace('?category', '&change[category]').replaceAll('?', '&')}`)
        setCompleted(true);
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver()
      })
    }),
    [url]
  );
  const router = useRouter();
  const [selected, select] = React.useState(true);
  React.useEffect(()=>{
    select(isWishlistSelected(url));
  }, [router, url]);

    return (
      <ListItem ref={drop} disablePadding sx={{ display: 'block' }}>
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
            {isOver ? <PlusOne/> : type}
          </ListItemIcon>
          <ListItemText disableTypography primary={<Typography style={{ fontWeight: selected ? 800:'normal' }}>{item || url.replace('/list/', '')}</Typography>} sx={{ opacity: open ? 1 : 0 }} />
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
  