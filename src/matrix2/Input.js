import React from 'react'
import NameInput from '../Components/utilities/NameInput'

export default function Input(props) {
    const makeNumbers = () => {
        let cells = []

        for (var i = 0; i < 16; i++) {
            if (i === 0) {
                cells.push(
                    <tr
                        id={'input' + (props.data.startRow + i)}
                        key={'input' + (props.data.startRow + i)}
                    >
                        <td rowSpan="16">
                            <NameInput value="Input name" />
                        </td>
                        <td style={{ fontSize: '10px' }} key={'inputNumber' + (i + 1)}>
                            <div style={{
                                width: '14px',
                                height: '14px',
                                backgroundColor: 'white'
                            }}>
                                {i + 1}
                            </div>
                        </td>
                    </tr>
                )
            } else {
                cells.push(
                    <tr
                        id={'input' + (props.data.startRow + i)}
                        key={'input' + (props.data.startRow + i)}
                    >
                        <td style={{ fontSize: '10px' }} key={'inputNumber' + (i + 1)}>
                            <div style={{
                                width: '14px',
                                height: '14px',
                                backgroundColor: 'white'
                            }}>
                                {i + 1}
                            </div>
                        </td>
                    </tr>
                )
            }

        }

        return cells
    }

    return (
        <table style={{ backgroundColor: 'red' }}>
            <tbody>
                {makeNumbers()}
            </tbody>
        </table>
    )
}
