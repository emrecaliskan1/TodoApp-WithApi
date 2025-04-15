import React, { useState } from 'react'
import './Todo.css'

function TodoCreate({onCreateTodo,todoContent,setTodoContent}) {

  return (
    <div className='todo-create'>
        <input 
        value={todoContent}
        onChange={(e)=>setTodoContent(e.target.value)}
        className='todo-input' type='text' placeholder='Todo gir:' />

        <button onClick={onCreateTodo} className='todo-create-button'>Todo Oluştur</button>
    </div>
  )
}

export default TodoCreate