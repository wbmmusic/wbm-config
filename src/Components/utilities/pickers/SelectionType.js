import React from 'react'

export default function SelectionType(props) {
    const options = ['Specific', 'Multiple', 'Range', 'Any']
    let tbl = []

    function handleClick(e) {
        props.sendData(props.type, e.target.innerHTML)
    }


    for (var i = 0; i < options.length; i++) {
        var cellStyle = {
            border: '1px solid black',
            cursor: 'context-menu',
            borderRadius: '5px',
            backgroundColor: 'white'
        }

        if (props.data === options[i]) {
            cellStyle.backgroundColor = 'lightgreen'
        }

        tbl.push(
            <td
                key={'selectionButton' + i + props.channel}
                style={cellStyle}
                onMouseDown={handleClick}
            >
                {options[i]}
            </td>
        )
    }

    return (
        <table style={{ width: '100%' }}>
            <tbody>
                <tr>
                    {tbl}
                </tr>
            </tbody>
        </table>
    )
}
