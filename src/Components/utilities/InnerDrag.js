import React, { Component } from 'react'
import OutputCmdPicker from './outputCmdPicker'

export class InnerDrag extends Component {

    constructor(props) {
        super(props)
        this.state = {
            val: [0, 1, 2, 3, 4, 5, 6, 7, 8]
        }




    }

    componentDidMount() {
        let temp = []
        for (var i = 0; i < 9; i++) {
            temp.push(Math.round(Math.random() * 127).toString())
        }
        console.log(temp)
        this.setState({ val: temp })
    }


    render() {
        return (
            <table style={{ width: '100%' }}>
                <tbody>
                    <tr>
                        <td style={cell}><OutputCmdPicker /></td>
                        <td style={cell}><OutputCmdPicker /></td>
                    </tr>
                    <tr>
                        <td style={cell}><OutputCmdPicker /></td>
                        <td style={cell}><OutputCmdPicker /></td>
                    </tr>

                </tbody>
            </table>
        )
    }
}

const cell = {
    backgroundColor: 'orange',
    margin: '10px'
}

export default InnerDrag
