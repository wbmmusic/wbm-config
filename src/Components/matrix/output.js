import React, { Component } from 'react'
import OutNumbers from './outNumbers'
import NameInput from '../utilities/NameInput' 

export class output extends Component {
    state = {
        name: this.props.usrOutputName
    }

    handleNameChange = (newName) =>{
        //console.log(e.target.value)
        this.setState({name: newName})
    }

    render() {
        return (
            <div style={{ width: '100%' }}>
                <div style={{ cursor: 'context-menu' }}>
                    {this.props.outputName}
                </div>

                <NameInput value={this.state.name} setValue={this.handleNameChange} />

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
