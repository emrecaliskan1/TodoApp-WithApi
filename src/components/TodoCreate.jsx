import React, { useState } from 'react'
import './Todo.css'
import { Button, DatePicker, Input } from 'antd'

function TodoCreate({onCreateTodo,todoContent,setTodoContent,setSelectedDate}) {

  return (
    <div className='todo-create'>
        <Input 
        value={todoContent}
        onChange={(e) => setTodoContent(e.target.value)}
        className='todo-input'
        type='text'
        placeholder='Todo gir:' 
      />
      
      <div style={{display:'flex',flexDirection:'row'}}>
        <DatePicker 
        style={{margin:"10px 0" , height:'30px'}}
        onChange={(date) => setSelectedDate(date)}
        placeholder='Tarih Seç'></DatePicker>
        
        <Button 
          style={{marginLeft:'20px'}}
          onClick={onCreateTodo} 
          className='todo-create-button'>
          Todo Oluştur
        </Button>
      </div>
      
    </div>
    
  )
}

export default TodoCreate