import React, { Component } from 'react'
import OutNumbers from './outNumbers'

export class output extends Component {
    render() {
        return (
            <div style={{ width: '100%' }}>
                <div>
                    {this.props.outputName}
                </div>

                <input
                    value={this.props.usrOutputName}
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
