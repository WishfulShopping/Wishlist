import React from 'react'
import filterGreaterThan from './filter/filterGreaterThan'
import filterBetween from './filter/filterBetween'
import filterDomain from './filter/filterDomain'
import ReferrerKiller from './columns/referrer-killer';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Close from '@mui/icons-material/Close';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

// This is a custom filter UI for selecting
// a unique option from a list
function SelectColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id },
}) {
  // Calculate the options for filtering
  // using the preFilteredRows
  const options = React.useMemo(() => {
    const options = new Set()
    preFilteredRows.forEach(row => {
      options.add(row.values[id])
    })
    return [...Array.from(options.values())]
  }, [id, preFilteredRows])

  // Render a multi-select box
  return (
    <select
      value={filterValue}
      onChange={e => {
        setFilter(e.target.value || undefined)
      }}
    >
      <option value="">All</option>
      {options.map((option, i) => (
        <option key={i} value={option}>
          {option}
        </option>
      ))}
    </select>
  )
}


// This is a custom filter UI for selecting
// a unique option from a list
function FaviconColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id },
}) {
  // Calculate the options for filtering
  // using the preFilteredRows
  const options = React.useMemo(() => {
    const options = new Set();
    preFilteredRows.forEach(row => {
      [row.original["url"], row.original["logo"]].forEach((option) => { 
      if (option && option.length) {
        const { hostname } = new URL(option);
        options.add(hostname.split(".").splice(-2).join("."))
      }});
    })
    return [...Array.from(options.values())]
  }, [id, preFilteredRows])

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setFilter(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  // Render a multi-select box
  return (
      <div>
        <FormControl sx={{ m: 1, width:"7em"}}>
          <InputLabel id="demo-multiple-name-label">Website</InputLabel>
          <Select
            labelId="demo-multiple-name-label"
            id="demo-multiple-name"
            multiple
            value={filterValue||[]}
            onChange={handleChange}
            input={<OutlinedInput label="Name" />}
          >
            {options.map((name) => (
              <MenuItem
                key={name}
                value={name}
              >
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button className="reset-button btn btn-secondary" onClick={() => setFilter(undefined)}>Reset</Button>
      </div>
  )
}

// This is a custom filter UI that uses a
// slider to set the filter value between a column's
// min and max values
function SliderColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id },
}) {
  // Calculate the min and max
  // using the preFilteredRows

  const [min, max] = React.useMemo(() => {
    let min = preFilteredRows.length ? preFilteredRows[0].values[id] : 0
    let max = preFilteredRows.length ? preFilteredRows[0].values[id] : 0
    preFilteredRows.forEach(row => {
      min = Math.min(row.values[id], min)
      max = Math.max(row.values[id], max)
    })
    return [min, max]
  }, [id, preFilteredRows])

  return (
    <>
      <input
        type="range"
        min={min}
        max={max}
        value={filterValue || min}
        onChange={e => {
          setFilter(parseInt(e.target.value, 10))
        }}
      />
      <Button className="reset-button btn btn-secondary" onClick={() => setFilter(undefined)}>Reset</Button>
    </>
  )
}

// Custom component to render Title 
const Title = ({row:{original}}) => {
  return (
    <Box sx={{width:"15rem"}}>
      <a id={original.id} href={original.url} target="_blank" rel="noopener noreferrer" >
        {original.title}
      </a>
    </Box>
  );
};


// Custom component to render Title 
const Price = ({row:{original}}) => {
  return (
    <Box sx={{width:"5rem", margin:"auto"}}>
      <a id={original.id} href={original.url} target="_blank" rel="noopener noreferrer" >
        {original.price>0 && `${original.price} €`}
      </a>
    </Box>
  );
};



const Picture = ({ id, value, favicon }) => {
  const getUrl = (value) => {
    const width = 250;
    if (value.match(/^http/))
      return ReferrerKiller.imageHtml(value, {width:`${width}px`}, favicon);

    if (value.match(/^data:image\/svg\+xml;/))
      return `<embed src="${value}" width="${width}px"  />`;

    return `<img src="${value}" width="${width}px" />`;
  }
  const [url, setUrl] = React.useState("");
  React.useEffect(()=>setUrl(getUrl(value)), [value]);

  return (
    <>
      <div className="alternative-image-container">
        <Button className="hover-alternative-image" onClick={()=>fetch(`${window.location.toString().replace('/list', '/api/alternative')}/${id}`).then((response)=>response.text()).then(res => setUrl(getUrl(res)))}>Load alternative image</Button>
        {url.length && (<div dangerouslySetInnerHTML={{ __html: url }}></div>)}
      </div>
    </>
  );
};
// Custom component to render Title 
const DeleteRow = ({row:{original}}) => {
  return (
    <>
      <div className="col-1 mx-auto" >
        <IconButton onClick={()=>fetch(`${window.location.toString().replace('/list', '/api/delete')}/${original.id}`).then(()=>window.location=window.location)}>
          <Close />
        </IconButton>
      </div>
    </>
  );
};

// This is a custom filter UI that uses a
// slider to set the filter value between a column's
// min and max values
function DoubleSliderColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id },
}) {
  // Calculate the min and max
  // using the preFilteredRows

  const [min, max] = React.useMemo(() => {
    let min = preFilteredRows.length ? preFilteredRows[0].values[id] : 0
    let max = preFilteredRows.length ? preFilteredRows[0].values[id] : 100
    preFilteredRows.forEach(row => {
      min = Math.min(row.values[id], min)
      max = Math.max(row.values[id], max)
    })
    return [min, max]
  }, [id, preFilteredRows])


  const handleChange = (event, newValue, activeThumb) => {
    filterValue = {
      min : newValue[0],
      max : newValue[1]
    }
    setFilter(filterValue);
  };

  return (
    <>
      <Box sx={{ width: '30rem' }}>
      <Slider
        getAriaLabel={() => 'Price'}
        value={[filterValue?.min||min, filterValue?.max||max]}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={(v)=>v}
        disableSwap
        defaultValue={[min, max]}
        step={10}
        min={min-10}
        max={max+10}
      />
    </Box>
      <Button className="reset-button-left btn btn-secondary" onClick={() => setFilter(undefined)}>Reset</Button>
    </>
  )
}


// This is a custom UI for our 'between' or number range
// filter. It uses two number boxes and filters rows to
// ones that have values between the two
function NumberRangeColumnFilter({
  column: { filterValue = [], preFilteredRows, setFilter, id },
}) {
  const [min, max] = React.useMemo(() => {
    let min = preFilteredRows.length ? preFilteredRows[0].values[id] : 0
    let max = preFilteredRows.length ? preFilteredRows[0].values[id] : 0
    preFilteredRows.forEach(row => {
      min = Math.min(row.values[id], min)
      max = Math.max(row.values[id], max)
    })
    return [min, max]
  }, [id, preFilteredRows])

  return (
    <div
      style={{
        display: 'flex',
      }}
    >
      <input
        value={filterValue[0] || ''}
        type="number"
        onChange={e => {
          const val = e.target.value
          setFilter((old = []) => [val ? parseInt(val, 10) : undefined, old[1]])
        }}
        placeholder={`Min (${min})`}
        style={{
          width: '70px',
          marginRight: '0.5rem',
        }}
      />
      to
      <input
        value={filterValue[1] || ''}
        type="number"
        onChange={e => {
          const val = e.target.value
          setFilter((old = []) => [old[0], val ? parseInt(val, 10) : undefined])
        }}
        placeholder={`Max (${max})`}
        style={{
          width: '70px',
          marginLeft: '0.5rem',
        }}
      />
    </div>
  )
}

const oldColumns = () => [
    {
      Header: 'Name',
      columns: [
        {
          Header: 'First Name',
          accessor: 'firstName',
        },
        {
          Header: 'Last Name',
          accessor: 'lastName',
          // Use our custom `fuzzyText` filter on this column
          filter: 'fuzzyText',
        },
      ],
    },
    {
      Header: 'Info',
      columns: [
        {
          Header: 'Age',
          accessor: 'age',
          Filter: SliderColumnFilter,
          filter: 'equals',
        },
        {
          Header: 'Visits',
          accessor: 'visits',
          Filter: NumberRangeColumnFilter,
          filter: 'between',
        },
        {
          Header: 'Status',
          accessor: 'status',
          Filter: SelectColumnFilter,
          filter: 'includes',
        },
        {
          Header: 'Profile Progress',
          accessor: 'progress',
          Filter: SliderColumnFilter,
          filter: filterGreaterThan,
        }
      ],
    },
  ]


export const Columns = () => [
  {
    Header: 'Favorites',
    columns: [
      {
        Header: 'Title',
        accessor: 'title',
        Cell: Title,
      },
      {
        Header: 'Price',
        accessor: 'price',
        Filter: DoubleSliderColumnFilter,
        filter: filterBetween,
        Cell: Price,
      },
      {
        Header: 'Picture',
        accessor: 'image',
        Cell: ({ row:{original}, cell: { value } }) => <Picture id={original.id} favicon={original.logo} value={value.split(',')[0]} />,
        Filter: FaviconColumnFilter,
        filter: filterDomain,
      },
      {
        Header: 'Delete',
        Cell: DeleteRow,
        Filter:null,
      }
    ],
  },
]