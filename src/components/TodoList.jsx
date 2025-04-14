import React from 'react'
import Todo from './Todo'

function TodoList({todos,onRemoveTodo,onUpdateTodo}) {
  return (
    <div style={{width:'100%', marginTop:'50px'}}>
        {
            todos && todos.filter((todo)=>todo&&todo.id!==undefined).map((todo)=>(
                <Todo key={todo.id} todo={todo}
                onRemoveTodo = {onRemoveTodo} onUpdateTodo={onUpdateTodo}/>
            ))
        }
    </div>
  )
}

export default TodoList