import React, { Fragment, useState } from 'react'

const momLatchOpts = ['Mom', 'Latch', 'Hold']

export default function MidiBtnButton() {
    const [type, settype] = useState(momLatchOpts[0])

    const lblStyle = {
        userSelect: 'none',
    }

    function handleTypeChange(e) {
        settype(momLatchOpts[e.target.id])
    }

    function momLatch() {
        let out = []
        for (var i = 0; i < momLatchOpts.length; i++) {

            var cellStyle = {
                backgroundColor: 'white',
                borderRadius: '3px',
                border: '1px solid grey',
                padding: '3px',
                userSelect: 'none'
            }

            if (type === momLatchOpts[i]) {
                cellStyle.backgroundColor = 'lightgreen'
            }

            out.push(
                <td
                    id={i}
                    style={cellStyle}
                    onMouseDown={handleTypeChange}
                >
                    {momLatchOpts[i]}
                </td>
            )
        }



        return out
    }

    function makeTable() {
        let table = []
        table.push(
            <tr>
                <td style={lblStyle}>
                    <b>Color:</b>
                </td>
                <td >
                    <div
                        style={{
                            backgroundColor: 'yellow',
                            height: '20px',
                            borderRadius: '3px',
                            boxShadow: 'inset 1px 1px 1px'
                        }}
                    />
                </td>
            </tr>
        )

        table.push(
            <tr>
                <td colSpan="2"><hr/></td>
            </tr>
        )

        table.push(
            <tr>
                <td style={lblStyle}>
                    <b>Type:</b>
                </td>
                <td>
                    <table style={{ width: '100%' }}>
                        <tbody>
                            <tr>
                                {momLatch()}
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
        )

        return table
    }



    return (
        <Fragment>
            <table style={{ width: '100%' }}>
                <tbody>
                    {makeTable()}
                </tbody>
            </table>
        </Fragment>
    )
}
