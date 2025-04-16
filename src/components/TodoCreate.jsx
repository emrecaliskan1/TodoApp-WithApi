import React, { useState } from 'react'
import './Todo.css'
import { Button, Input } from 'antd'

function TodoCreate({onCreateTodo,todoContent,setTodoContent}) {

  return (
    <div className='todo-create'>
        <Input 
        value={todoContent}
        onChange={(e) => setTodoContent(e.target.value)}
        className='todo-input'
        type='text'
        placeholder='Todo gir:' 
      />
      <Button 
        onClick={onCreateTodo} 
        className='todo-create-button'>
        Todo Oluştur
      </Button>
    </div>
  )
}

export default TodoCreate