import React, { Component } from 'react'

export class matrix extends Component {
    state = {
        cols: this.props.cols,
        rows: this.props.rows,
        count: 0,
        color: 'blue',
        patches: [
            {
                id: 0,
                selected: false
            }
        ]
    }

    onClick() {
        this.setState(state => ({
            count: state.count + 1
        }));
        console.log('clicked')
    }

    render() {
        let rows = [];
        for (var i = 0; i < this.state.rows; i++) {
            let rowID = `row${i}`
            let cell = []
            for (var idx = 0; idx < this.state.cols; idx++) {
                let cellID = `cell${i}-${idx}`
                cell.push(<td
                    key={cellID}
                    id={cellID}
                    onClick={this.onClick.bind(this)}
                    style={td}></td>)
            }
            rows.push(<tr key={i} id={rowID} style={rowstyle}>{cell}</tr>)
        }
        return (
            <table style={theTable}>
                <tbody>
                    {this.state.count}
                    {rows}
                </tbody>
            </table>
        )
    }
}

const td = {
    //border: "1px black solid",
    width: "14px",
    minWidth: "14px",
    height: "14px",
    minHeight: "14px",
    backgroundColor: "#333",
}

const rowstyle = {
    //border: "1px black solid",
    display: "block",
    //backgroundColor: "green",
    lineHeight: '1px',
    maxHeight: '18px',
}

const theTable = {
    //border: "1px black solid",
    //backgroundColor: "red",
    display: "block",
    tableLayout: "fixed",
}

export default matrix
