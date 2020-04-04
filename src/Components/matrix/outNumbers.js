import React, { Component } from 'react'
import NumberCell from './numberCell'
import { v4 as uuid } from 'uuid';

export class outNumbers extends Component {
    state = {
        cols: this.props.cols,
        rows: 1,
        patches: []
    }
    render() {
        let rows = [];
        for (var i = 0; i < 1; i++) {
            let rowID = `row${i}`
            let cell = []
            for (var idx = 0; idx < this.state.cols; idx++) {
                let cellID = `row${i} col${idx}`
                cell.push(<NumberCell key={uuid()} number={idx+1}></NumberCell>)

                this.state.patches.indexOf({ id: cellID }) === -1 ? this.state.patches.push({ id: cellID }) : console.log("This item already exists");
            }
            rows.push(<tr key={i} id={rowID} style={rowstyle}>{cell}</tr>)
        }
        return (
            <table>
                <tbody>
                    {rows}
                </tbody>
            </table>
        )
    }
}

const rowstyle = {
    display: "block",
    lineHeight: '1px',
}

const theTable = {
    display: "block",
    tableLayout: "fixed",
}

export default outNumbers
