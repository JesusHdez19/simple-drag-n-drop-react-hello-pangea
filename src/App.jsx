import { useEffect, useState } from "react"
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const initialTodos = JSON.parse(localStorage.getItem('todos') || [])

const App = () => { 

  const [todos, setTodos] = useState(initialTodos)

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const handleDragEnd = result => {
    if(!result.destination) return

    const startIndex = result.source.index
    const endIndex = result.destination.index

    const copyArray = [...todos]
    const [reorderedItem] = copyArray.splice(startIndex, 1)

    copyArray.splice(endIndex, 0, reorderedItem)

    setTodos(copyArray)
    
  }

  return( 
    <DragDropContext onDragEnd={handleDragEnd}>
      <p>Todo</p>
      <Droppable droppableId="todos">
        {
          (droppableProvider) => (
            <ul ref={droppableProvider.innerRef} {...droppableProvider.droppableProps}>
              {
                todos.map((todo, index) => (
                  <Draggable key={todo.id} index={index} draggableId={`${todo.id}`}>
                    {
                      (draggabbleProvider) => (
                        <li ref={draggabbleProvider.innerRef} {...draggabbleProvider.dragHandleProps}
                        {...draggabbleProvider.draggableProps}>{todo.text}</li>
                      )
                    }
                  </Draggable>
                ))
              }
              {droppableProvider.placeholder}
            </ul>
          )
        }
        
      </Droppable>
    </DragDropContext>
  )
}

export default App