
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import React from 'react'
import 'regenerator-runtime/runtime';
import { useRouter } from 'next/router'
import Item from './item';

export default function Category({url}) {
  const [data, setData] = React.useState([]);
  const router = useRouter();
  React.useEffect(() => {
    /* get wishlist data*/
    fetch(url.replace('/list', '/api/hello'))
      .then(response => response.json())
      .then(data=>Array.from(Object.entries(data).reduce((categories, [index, item])=>{categories.add(item.category); return categories}, new Set([undefined]))))
      .then(setData);
  }, []);
  
  return (
    <>
      {data.map((category, index)=>(
        <Item key={index} url={url + (category ? '?category=' + category : '')} item={category ? category : 'All items'} type={null}/>
        ))}
      <Item url={url + '?category=_'} item={'Uncategorized'} type={null}/>

<ListItem disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
                onClick={()=>setData([...data, prompt("Please enter a name", "Harry Potter")])}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                > 
                </ListItemIcon>
                <ListItemText primary={"+ Create a category"} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
      </>
  )
}
