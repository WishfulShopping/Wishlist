

import { useDrag } from 'react-dnd'
import React from 'react'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { useRouter } from 'next/router'
import { getDragAndDropSourceUrl, isReadWriteUrl } from '../../lib/url';

export default function Row({row}) {
    
    const [dragCompleted, setDragCompleted] = React.useState(false);
    const [{ isDragging }, drag] = useDrag(() => ({
      type: 'row',
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging()
      }),
      item: ()=> {
        return [row.original.id, getDragAndDropSourceUrl(), setDragCompleted];
      },
      canDrag: isReadWriteUrl
    }), [row])

    const router = useRouter();

  React.useEffect(() => {
    setDragCompleted(false);
  }, [router]);

    return (
      <Card {...row.getRowProps()} ref={drag} style={{
        opacity: isDragging ? 0.5 : 1,
        display: dragCompleted?'none':'block',
        cursor: 'move',
        minWidth: 275,
        float:"left",
        margin:'1em 1em 0 0'
      }}>
        <CardContent>
        {row.cells.map((cell, i) => {
          return <Box key={i} className={cell.column.id} {...cell.getCellProps()}>{cell.render('Cell')}</Box>
        })}
        </CardContent>
      </Card>
    )
  }
  