import React, { Component } from 'react'
import OutNumbers from './outNumbers'

export class output extends Component {
    state = {
        name: this.props.usrOutputName
    }

    handleNameChange = (e) =>{
        //console.log(e.target.value)
        this.setState({name: e.target.value})
    }

    render() {
        return (
            <div style={{ width: '100%' }}>
                <div style={{ cursor: 'context-menu' }}>
                    {this.props.outputName}
                </div>

                <input
                    value={this.state.name}
                    onChange={this.handleNameChange}
                    style={{ marginBottom: '5px', textAlign: 'center', width: '90%' }}
                />

                <div style={td}>
                    <OutNumbers cols={this.props.cols} />
                </div>
            </div>
        )
    }
}

const td = {
    //border: '2px black solid'
    //backgroundColor: 'red'
}

export default output
