import React, { Component } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import styled from 'styled-components'
import InnerDrag from './InnerDrag'

const Container = styled.div`
border: 1px solid black;
border-radius: 2px;
margin-bottom: 8px;
background-color: green;
`


export class DragObject extends Component {
    render() {
        return (
            <Draggable draggableId={this.props.task.id} index={this.props.index}>
                {(provided, snapshot) => (
                    <Container
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        isDragging={snapshot.isDragging}
                    >
                        {this.props.task.content}
                        <InnerDrag />
                    </Container>
                )}
            </Draggable>
        )
    }
}


export default DragObject
