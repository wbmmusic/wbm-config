import React, { Component } from 'react'

export class InputSelect extends Component {
    constructor(props) {
        super(props)
        this.state = {
            numberOfIns: this.props.numberOfIns,
            selectedIns: this.props.selected
        }
    }

    bit_test = (num, bit) => {
        return ((num >> bit) % 2 != 0)
    }

    bit_set = (num, bit) => {
        return num | (1 << bit);
    }

    bit_clear = (num, bit) => {
        return num & ~(1 << bit);
    }

    bit_toggle = (num, bit) => {
        return num ^= (1 << bit);
    }

    isUsingAllIns = () => {
        let out = true
        for (var i = 0; i < this.state.numberOfIns; i++) {
            if (!this.bit_test(this.state.selectedIns, i)) {
                out = false
                break
            }
        }
        return out
    }

    handleInClick = (e) => {
        let tempSelectedIns = this.state.selectedIns

        if (e.target.innerHTML === 'ANY') {
            console.log('Got an ANY')
            tempSelectedIns = 0;
            console.log(this.state.numberOfIns)
            for (var i = 0; i < this.state.numberOfIns; i++) {
                tempSelectedIns = this.bit_set(tempSelectedIns, i)
            }
            this.setState({ selectedIns: tempSelectedIns })
        } else {
            let clickedIn = parseInt(e.target.innerHTML)
            console.log(clickedIn)

            //toggle bit clickedIn
            this.setState({ selectedIns: this.bit_toggle(tempSelectedIns, clickedIn - 1) })
        }
    }

    render() {
        let ins = []

        for (var i = 0; i <= this.state.numberOfIns; i++) {
            let cell = {
                border: '1px solid black',
                borderRadius: '5px',
                backgroundColor: 'white',
                cursor: 'context-menu'
            }

            if (i > 0) {
                if (this.bit_test(this.state.selectedIns, i - 1)) {
                    cell.backgroundColor = 'lightgreen'
                }
                ins.push(
                    <td style={cell} onMouseDown={this.handleInClick}>{i}</td>
                )
            } else {
                if (this.isUsingAllIns()) {
                    cell.backgroundColor = 'lightgreen'
                }

                ins.push(
                    <td style={cell} onMouseDown={this.handleInClick}>ANY</td>
                )
            }

        }

        return (
            <div>
                <table style={{
                    width: '100%'
                }}>
                    <tbody>
                        <tr>
                            {ins}
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}


export default InputSelect
