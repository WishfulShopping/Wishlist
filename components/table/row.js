

import { useDrag } from 'react-dnd'
import React from 'react'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

export default function Row({row}) {
    
    const [{ isDragging }, drag] = useDrag(() => ({
      type: 'row',
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging()
      }),
      item: ()=> {
        return [arguments[0].row.original.id, window.location.toString()];
      }
    }))

    return (
      <Card {...row.getRowProps()} ref={drag} style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
        minWidth: 275,
        float:"left",
        margin:'1em 1em 0 0'
      }}>
        <CardContent>
        {row.cells.map(cell => {
          return <Box className={cell.column.id} {...cell.getCellProps()}>{cell.render('Cell')}</Box>
        })}
        </CardContent>
      </Card>
    )
  }
  