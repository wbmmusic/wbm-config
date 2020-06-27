import React, { Component } from 'react'
import DragChannel from './DragChannel'
import { DragDropContext } from 'react-beautiful-dnd'


export class Drag extends Component {
    state = {
        tasks: {
            'task-1': { id: 'task-1', content: 'Command 1' },
            'task-2': { id: 'task-2', content: 'Command 2' },
            'task-3': { id: 'task-3', content: 'Command 3' },
            'task-4': { id: 'task-4', content: 'Command 4' }
        },
        columns: {
            'column-1': {
                id: 'column-1',
                title: 'Drag to reorder',
                taskIds: ['task-1', 'task-2', 'task-3', 'task-4']
            }
        },
        columnOrder: ['column-1']
    }

    onDragEnd = result => {
        document.body.style.color = 'inherit'
        // TODO: reorder our column
        const { destination, source, draggableId } = result;

        if (!destination) {
            return
        }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return
        }

        const column = this.state.columns[source.droppableId]
        const newTaskIds = Array.from(column.taskIds)

        newTaskIds.splice(source.index, 1)
        newTaskIds.splice(destination.index, 0, draggableId)

        const newColumn = {
            ...column,
            taskIds: newTaskIds
        }

        const newState = {
            ...this.state,
            columns: {
                ...this.state.columns,
                [newColumn.id]: newColumn
            }
        }

        this.setState(newState)

    }

    render() {
        return (
            <DragDropContext
                onDragEnd={this.onDragEnd}
            >
                {this.state.columnOrder.map(columnId => {
                    const column = this.state.columns[columnId]
                    const tasks = column.taskIds.map(taskId => this.state.tasks[taskId])

                    return <DragChannel key={column.id} column={column} tasks={tasks} />
                })}
            </DragDropContext>
        )
    }
}

export default Drag
