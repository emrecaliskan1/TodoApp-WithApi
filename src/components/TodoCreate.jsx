import React, { useState } from 'react'
import './Todo.css'

function TodoCreate({onCreateTodo,todoContent,setTodoContent}) {

    const [newTodo,setNewTodo] = useState('')

    // const clearInput = () => {
    //     setNewTodo('')
    // }

    // const createTodo = () => {
    //     if(!newTodo) return;
    //     const request = {
    //         id:Math.floor(Math.random()*1000),
    //         content:newTodo
    //     }
    //     onCreateTodo(request)
    //     clearInput()
    // }


    const handleCreate = () => {
        if (!todoContent.trim()) return;
    
        const newTodo = {
          id: Date.now().toString(),
          content: todoContent
        };
    
        onCreateTodo(newTodo);
        setTodoContent('');
      };

  return (
    <div className='todo-create'>
        <input 
        value={todoContent}
        onChange={(e)=>setTodoContent(e.target.value)}
        className='todo-input' type='text' placeholder='Todo gir:' />

        <button onClick={handleCreate} className='todo-create-button'>Todo Oluştur</button>
    </div>
  )
}

export default TodoCreate