import React from 'react'
import {filterBetween, DoubleSliderColumnFilter} from './filter/filterBetween'
import {filterDomain, FaviconColumnFilter} from './filter/filterDomain'
import {filterCategory, CategoryInput, CategoryCell} from './filter/filterCategory'
import ReferrerKiller from './columns/referrer-killer';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Close from '@mui/icons-material/Close';
import Reload from '@mui/icons-material/Refresh';
import Box from '@mui/material/Box';
import { Link, Typography } from '@mui/material';
import theme from '../src/theme';
import { getDeleteItemUrl, getLoadAlternativeImageUrl, isReadWriteUrl, reloadPage } from '../lib/url';
import { filterShopping, ShoppingCell, ShoppingInput } from './filter/filterShopping';




// Custom component to render Title 
const Title = ({row:{original}}) => {
  return (
    <Box sx={{width:"15rem", height:"2rem;", marginTop:"1em"}}>
      {original.title.split("|").map(title => (<Typography noWrap>
        <Link sx={{textDecoration:"None"}} id={original.id} href={original.url} target="_blank" rel="noopener noreferrer">
        {title}
       </Link>
      </Typography>))}
    </Box>
  );
};


// Custom component to render Title 
const Price = ({row:{original}}) => {
  return (
    <Box sx={{position:"relative", float:"right", padding: "1em", marginTop:"-3em;",marginRight:"2em;", backgroundColor:"rgba(255,255,255,0.8);", borderRadius: "50px;", textAlign:"center"}}>
      <Link id={original.id} href={original.url} target="_blank" rel="noopener noreferrer" sx={{textDecoration:"none", fontSize:"1.5em;", color:theme.palette.quinary.main}}>
        {original.price>0 && `${original.price} €`}
      </Link>
    </Box>
  );
};



const Picture = ({ row:{original}, cell: { value } }) => {

  const id = original.id;
  const favicon = original.logo;

  const getUrl = (value) => {
    const width = 250;
    if (value.match(/^http/))
      return ReferrerKiller.imageHtml(value, {width:`${width}px`}, favicon);

    if (value.match(/^data:image\/svg\+xml;/))
      return `<embed src="${value}" width="${width}px"  />`;

    return `<img src="${value}" width="${width}px" />`;
  }
  const [url, setUrl] = React.useState("");
  React.useEffect(
    ()=> {
      if (value) {
        setUrl(getUrl(value.split(',')[0]));
      }
    },
    [
      value
    ]
  );

  return (
    <>
    {isReadWriteUrl() && <Button color="quinary" sx={{position:"absolute", marginLeft:"1em;", float:"left", marginTop:"-1em"}} title="Load alternative image" className="hover-alternative-image" onClick={()=>fetch(getLoadAlternativeImageUrl(id)).then((response)=>response.text()).then(res => setUrl(getUrl(res)))}><Reload/></Button>}
      <Box sx={{height:"15rem", overflow:"hidden"}}>
        {url.length && (<div dangerouslySetInnerHTML={{ __html: url }}></div>)}
      </Box>
    </>
  );
};
// Custom component to render Title 
const DeleteRow = ({row:{original}}) => {
  return (
    <>
      {isReadWriteUrl() && <Box sx={{position:"relative", float:"right", marginTop:"-1em"}} >
        <IconButton title="Delete" onClick={()=>fetch(getDeleteItemUrl(original.id)).then(reloadPage)}>
          <Close />
        </IconButton>
      </Box>}
    </>
  );
};




export const Columns = (shoppingCart, setShoppingCart) => () => [
  {
    Header: 'Favorites',
    columns: [
      {
        Header: 'Shopping',
        accessor: 'shopping',
        filter: filterShopping,
        Cell: (props) => <ShoppingCell shoppingCart={shoppingCart} setShoppingCart={setShoppingCart} {...props} /> ,
        Filter: (props) => <ShoppingInput shoppingCart={shoppingCart} setShoppingCart={setShoppingCart} {...props} /> ,
      },
      {
        Header: 'Delete',
        Cell: DeleteRow,
        Filter:null,
      },
      {
        Header: 'Picture',
        accessor: 'image',
        Cell: Picture,
        Filter: FaviconColumnFilter,
        filter: filterDomain,
      },
      {
        Header: 'Price',
        accessor: 'price',
        Filter: DoubleSliderColumnFilter,
        filter: filterBetween,
        Cell: Price,
      },
      {
        Header: 'Title',
        accessor: 'title',
        Cell: Title,
      },
      {
        Header: 'Category',
        accessor: 'category',
        filter: filterCategory,
        Cell: CategoryCell,
        Filter: CategoryInput,
      }
    ],
  },
]