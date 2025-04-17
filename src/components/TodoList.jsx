import React from 'react'
import Todo from './Todo'

function TodoList({todos,onRemoveTodo,onUpdateTodo,showCompleted}) {

  const filteredTodos = showCompleted  ? todos.filter(todo => todo.isCompleted) : todos;
  return (
    
    <div style={{width:'100%', marginTop:'50px'}}>
        {
            filteredTodos && filteredTodos.filter((todo)=>todo&&todo.id!==undefined).map((todo)=>(

                <Todo key={Math.random()*100} todo={todo}
                onRemoveTodo = {onRemoveTodo} onUpdateTodo={onUpdateTodo}/>
            ))
        }
    </div>
  )
}

export default TodoList 