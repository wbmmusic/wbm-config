import React, { Component } from 'react'
import OutputCommand from "./outputCommand";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';


export class outputCommands extends Component {
    constructor(props) {
        super(props)
        this.state = {
            commands: []
        }

        this.addCommand = this.addCommand.bind(this)
        this.gotData = this.gotData.bind(this)
    }

    gotData = (name, num, theState) => {
        console.log('GOT DATA ' + name)

        if (name === 'name-change') {
            console.log('Name Change')

            var temp = this.state.commands
            temp[num - 1] = theState
            this.setState({ commands: temp })
        }
    }

    removeCommand = (arg) => {
        console.log('Remove ' + arg)
        console.log(arg)
        var temp = this.state
        temp.commands.splice((arg - 1), 1)
        this.setState(temp)
    }

    addCommand = () => {
        console.log('Add Command')
        var temp = this.state
        temp.commands.push('')
        this.setState(temp)
    }

    render() {
        let outputCommandList = []

        for (var i = 0; i < this.state.commands.length; i++) {
            outputCommandList.push(
                <OutputCommand
                    num={i + 1}
                    remove={this.removeCommand}
                    sendData={this.gotData}
                    statex={this.state.commands[i]}
                />
            )
        }

        return (
            <div style={{ maxWidth: '300px' }}>
                <div style={{
                    maxHeight: '400px',
                    overflow: 'auto'
                }}>

                    <div align="left">
                    </div>
                    <DragDropContext>
                        <Droppable>

                            {(provided, snapshot) => (
                                <div
                                    style={commandsList}
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    isDraggingOver={snapshot.isDraggingOver}
                                >
                                    {outputCommandList}
                                    {provided.placeholder}
                                </div>
                            )}

                        </Droppable>
                    </DragDropContext>
                </div>
                <button
                    style={{
                        width: '100%'
                    }}
                    onMouseDown={this.addCommand}
                >
                    <b>+ CMD</b>
                </button>
            </div>
        )
    }
}

const commandsList = {
    backgroundColor: 'red'
}

export default outputCommands
