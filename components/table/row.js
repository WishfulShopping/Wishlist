

import { useDrag } from 'react-dnd'
import React from 'react'

export default function Row({row}) {
    
    const [{ isDragging }, drag] = useDrag(() => ({
      type: 'row',
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging()
      }),
      item: ()=> {
        return arguments[0].row.original;
      }
    }))

    return (
      <tr {...row.getRowProps()} ref={drag} style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
      }}>
        {row.cells.map(cell => {
          return <td className={cell.column.id} {...cell.getCellProps()}>{cell.render('Cell')}</td>
        })}
      </tr>
    )
  }
  