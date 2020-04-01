import React, { Component } from 'react'
import Matrix from './matrix'

export class matraces extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cols: this.props.cols,
            rows: this.props.rows
        }
    }
    render() {
        let rows = [];
        for (var i = 0; i < this.state.rows; i++) {
            let rowID = `row${i}`
            let cell = []
            for (var idx = 0; idx < this.state.cols; idx++) {
                let cellID = `cell${i}-${idx}`
                cell.push(<td key={cellID} id={cellID} style={td}><Matrix cols='9' rows='6' /></td>)
            }
            rows.push(<tr key={i} id={rowID} style={rowstyle}>{cell}</tr>)
        }
        return (
            <div style={theTable}>
            <table style={theTable}>
                <tbody>
                {rows}
                </tbody>
            </table>
            </div>
        )
    }
}

const td = {
    //border: "1px black solid",
}

const rowstyle = {
    //border: "1px black solid",
}

const theTable = {
    //border: "1px black solid",
    overflow: 'auto',
    height: '70vh',
    backgroundColor: '#444',
    display: 'block',
}

export default matraces
