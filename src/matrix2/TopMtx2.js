import React from 'react'
import './matrixStyle.css'
import Input from './Input'
import Matrix from './Matrix'
import Output from './Output'

export default function TopMtx2() {
    let outputCols = []

    let state = {
        numOfIns: 3,
        numOfOuts: 3
    }

    for (var i = 0; i < 3; i++) {
        outputCols.push(
            <div className="grid-col">
                {'output ' + (i + 1)}
            </div>
        )
    }



    const makeTable = () => {
        let table = []

        for (var col = 0; col <= state.numOfOuts; col++) {
            let column = []

            if (col === 0) {
                console.log('In Dis')
                for (let row = 0; row <= state.numOfIns; row++) {
                    if (row === 0) {
                        column.push(
                            <div key="leftColHeader" className="grid-item grid-item--header">
                                {}
                            </div>
                        )
                    } else {
                        column.push(
                            <div key={"leftColIn" + row} className="grid-item">
                                <Input data={{
                                    startRow: (row - 1) * 16
                                }}
                                />
                            </div>
                        )
                    }
                }
                table.push(
                    <div key="inCol" className="grid-col grid-col--fixed-left">
                        {column}
                    </div>
                )
            } else {
                for (let row = 0; row <= state.numOfIns; row++) {
                    if (row === 0) {
                        column.push(
                            <div key={'col' + col + 'header'} className="grid-item grid-item--header">
                                <Output />
                            </div>
                        )
                    } else {
                        column.push(
                            <div key={'matrix' + row + 'col' + col} className="grid-item">
                                <Matrix
                                    data={{
                                        startCol: (col - 1) * 16,
                                        startRow: (row - 1) * 16,
                                        cols: 16,
                                        rows: 16,
                                    }}
                                />
                            </div>
                        )
                    }
                }
                table.push(
                    <div key={'matrixCol' + col} className="grid-col">
                        {column}
                    </div>
                )
            }
        }
        return table
    }


    return (
        <div className="grid-container">
            <div className="grid">
                {makeTable()}
            </div>
        </div>
    )
}
