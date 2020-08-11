import React, { useState } from 'react'

export default function MatrixCell(props) {
    const cellStyle = {
        width: '14px',
        height: '14px',
        borderRadius: '2px'
    }
    const [selected, setselected] = useState(props.data)
    const [over, setover] = useState(false)

    if (selected) {
        if (over) {
            cellStyle.backgroundColor = 'indianred'
        } else {
            cellStyle.backgroundColor = 'lightgrey'
        }
    } else {
        if (over) {
            cellStyle.backgroundColor = 'lightgreen'
        } else {
            cellStyle.backgroundColor = 'gray'
        }
    }

    return (
        <div
            style={cellStyle}
            onMouseOver={() => setover(true)}
            onMouseOut={() => setover(false)}
            onMouseDown={() => setselected(!selected)}
            col={props.col}
            row={props.row}
        />

    )
}
