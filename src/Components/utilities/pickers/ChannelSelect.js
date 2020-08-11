import React from 'react'
import { v4 as uuid } from 'uuid';

function bit_test(num, bit) {
    return ((num >> bit) % 2 !== 0)
}

function bit_toggle(num, bit) {
    return num ^= (1 << bit);
}

export default function ChannelSelect(props) {
    function handleClick(e) {
        //console.log(e.target.innerHTML + ' Pressed')
        if (e.target.innerHTML === 'ALL') {
            var allSelected = true
            for (var i = 0; i < 16; i++) {
                if (!bit_test(props.data, i)) {
                    allSelected = false
                    break
                }
            }
            if (allSelected) {
                props.sendData(0)
            } else {
                props.sendData(0xFFFF)
            }

        } else {
            var channel = parseInt(e.target.innerHTML) - 1
            props.sendData(bit_toggle(props.data, channel))
        }
    }

    function makeTable() {
        var out = []
        var topRow = []
        var bottomRow = []

        for (var i = 0; i < 17; i++) {
            let cellStyle = {
                border: '1px solid black',
                cursor: 'context-menu',
                borderRadius: '5px',
                backgroundColor: 'white'
            }

            if (i === 0) {
                var allSelected = true
                for (var x = 0; x < 16; x++) {
                    if (!bit_test(props.data, x)) {
                        allSelected = false
                        break
                    }
                }
                if (allSelected) {
                    cellStyle.backgroundColor = 'lightgreen'
                }
            } else {
                if (bit_test(props.data, i - 1)) {
                    cellStyle.backgroundColor = 'lightgreen'
                }
            }

            if (i > 0 && i < 9) {
                topRow.push(
                    <td
                        key={'channelBtn' + i + props.channel}
                        style={cellStyle}
                        onMouseDown={handleClick}
                    >
                        {i}
                    </td>
                )
            } else if (i > 8) {
                bottomRow.push(
                    <td
                        key={'channelBtn' + i + props.channel}
                        style={cellStyle}
                        onMouseDown={handleClick}
                    >
                        {i}
                    </td>
                )
            } else if (i === 0) {
                topRow.push(
                    <td
                        key={'allBtn' + i + props.channel}
                        rowSpan="2"
                        style={cellStyle}
                        onMouseDown={handleClick}
                    >
                        ALL
                    </td>
                )
            }
        }

        out.push(
            <tr key={'channelTopRow' + i + props.channel}>
                {topRow}
            </tr>
        )

        out.push(
            <tr key={'channelBottomRow' + i + props.channel}>
                {bottomRow}
            </tr>
        )

        return out
    }
    return (
        <table style={{ width: '100%' }}>
            <tbody>
                {makeTable()}
            </tbody>
        </table>
    )
}
