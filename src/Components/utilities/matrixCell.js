import React, { Component } from 'react'

export class matrixCell extends Component {
    state = {
        selected: false,
        bgColor: '#333'
    };

    handleChange = () => {
        //console.log('A patch cell has been clicked')
        if (this.state.selected) {
            this.setState({
                bgColor: '#333',
                selected: false
            })
        } else {
            this.setState({
                bgColor: '#888',
                selected: true
            })
        }
    }

    render() {
        return <td onClick={this.handleChange} style={{
            backgroundColor: this.state.bgColor,
            padding: '8px',
        }} ></ td>
    }
}

export default matrixCell
