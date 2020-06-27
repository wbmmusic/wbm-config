import React, { Component } from 'react'
import { Droppable } from 'react-beautiful-dnd'
import DragObject from './DragObject'

export class DragChannel extends Component {
    render() {
        return (
            <div>
                <h2>{this.props.column.title}</h2>
                <Droppable droppableId={this.props.column.id}>
                    {(provided, snapshot) => (
                        <div
                            style={{
                                backgroundColor: 'blue',
                                border: '10px black solid',
                                display: 'inline-block',
                            }}
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            isDraggingOver={snapshot.isDraggingOver}
                        >
                            {this.props.tasks.map((task, index) => (
                                <DragObject  key={task.id} task={task} index={index} />
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </div>
        )
    }
}

export default DragChannel
