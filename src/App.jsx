import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TodoCreate from './components/TodoCreate'
import TodoList from './components/TodoList'
import axios from 'axios'
import { AudioOutlined } from '@ant-design/icons';
import { Input, Space } from 'antd';
import Search from 'antd/es/transfer/search'

const API_URL = ""
const SHEET_NAME = ""



function App() {

  const [todos,setTodos] = useState([])
  const [filteredTodos,setFilteredTodos] = useState(todos)

  
  const createTodo = (newTodo) => {
    setTodos([...todos,newTodo])
    setFilteredTodos([...todos,newTodo])
  }

  const removeTodo = (todoId) => {
    const updatedTodos = todos.filter((todo)=>todo.id!==todoId)
    setTodos(updatedTodos)
    setFilteredTodos(updatedTodos)
  }

  const updateTodo = (newTodo)=> {
    const updatedTodos = todos.map((todo)=>{
      if(todo.id !== newTodo.id){
        return todo;
      }
      return newTodo;
    })

    setTodos([...updatedTodos])
    setFilteredTodos(updatedTodos)
    
  }

  const onSearch = (e) => {
    const filteredTodos = todos.filter( (todo) => {
      todo.content.toLowerCase().includes(e.toLowerCase())
    })
    setFilteredTodos(filteredTodos)
  }

  const onChange = (e) => {
    const value = e.target.value.toLowerCase();
    if (!value) {
      setFilteredTodos(todos);
      return;
    }
  
    const filtered = todos.filter((todo) =>
      todo.content.toLowerCase().includes(value)
    );
    setFilteredTodos(filtered);
  };



  return (
   <div className='App'>
    <div>
      <TodoCreate onCreateTodo={createTodo}></TodoCreate>

      <Search
      placeholder="Todo ara..."
      enterButton="Search"
      size="large"
      onSearch={onSearch}
      onChange={onChange}
      allowclear
      className = "filter"      
    />

      <TodoList todos={filteredTodos} onRemoveTodo={removeTodo} onUpdateTodo={updateTodo}></TodoList>
    </div>

   </div>
  )
}

export default App
