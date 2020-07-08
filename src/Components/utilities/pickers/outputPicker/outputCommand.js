import React, { Component } from 'react'
import OutputCmdPicker from './outputCmdPicker'

export class outputCommand extends Component {

    constructor(props) {
        super(props)
        this.state = {
            commandName: 'Name This Command'
        }

        this.handleNameChange = this.handleNameChange.bind(this)
        this.handleRemove = this.handleRemove.bind(this)
    }


    handleNameChange(e) {
        var temp = this.state
        temp.commandName = e.target.value
        this.setState(temp)
        this.props.sendData('name-change', this.props.num, temp)
    }

    handleRemove = () => {
        console.log('remove ' + this.props.num)
        this.props.remove(this.props.num)
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.statex !== prevState) {
            return nextProps.statex;
        }
        else return null;
    }


    render() {
        return (
            <div style={container}>
                <table style={{ width: '100%' }}>
                    <tbody>
                        <tr>
                            <td>
                                <div style={{
                                    display: 'inline-block',
                                    left: '0'
                                }}>
                                    {this.props.num}
                                </div>

                                <input
                                    style={{
                                        textAlign: 'center',
                                        border: '1px solid lightgrey'
                                    }}
                                    size={this.state.commandName.length}
                                    type="text"
                                    value={this.state.commandName}
                                    onChange={this.handleNameChange}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Command Info</td>
                        </tr>
                        <tr>
                            <button onMouseDown={this.handleRemove}>
                                Remove
                            </button>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

const container = {
    backgroundColor: 'white',
    border: '1px solid black',
    marginBottom: '5px'
}

export default outputCommand
