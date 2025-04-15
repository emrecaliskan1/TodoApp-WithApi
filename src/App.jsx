import { useEffect, useState } from 'react'
import './App.css'
import TodoCreate from './components/TodoCreate'
import TodoList from './components/TodoList'
import Search from 'antd/es/transfer/search'
import { ToastContainer, toast } from 'react-toastify';
import {
  fetchTodos,
  updateTodo,
  deleteTodo,
  createTodo
} from './services/api';


function App() {

  const [todos,setTodos] = useState([])
  const [todoContent, setTodoContent] = useState("");
  const [filteredTodos,setFilteredTodos] = useState([])

  useEffect(() => {
    const getTodos = async () => {
      const data = await fetchTodos();
      setTodos(data);
      setFilteredTodos(data);
    };
    getTodos();
    toast.success("TodoList başarıyla veritabanından getirildi...")
  }, []);
  

  //Todo SİLME
  const removeTodo = async (id) => {
    try {

      await deleteTodo(id);
  
      const updatedTodos = todos.filter((todo)=>todo.id !== id)
      setTodos(updatedTodos); 
      setFilteredTodos(updatedTodos);
  
      toast.success("Todo başarıyla silindi.")
      
    } catch (error) {
      console.error('Todo silinirken hata oluştu:', error);
      toast.error("Todo silinirken hata oluştu.")
    }
  };


  //TODO YARATMA
  const handleCreateTodo = async () => {
    try {
      const newTodo = {
        id: Math.floor(Math.random()*100),
        content: todoContent,
        detail:"",
      };

      const result = await createTodo(newTodo);

      const addedTodo = {
        id: result.row_id, 
        content: todoContent,
        row_id:result.row_id,
      };
      const updatedTodos = [...todos, addedTodo];
      setTodos(updatedTodos);
      setFilteredTodos(updatedTodos);
      setTodoContent("");

      toast.success("Todo başarıyla eklendi!");

    } catch (error) {
      toast.error("Todo eklenirken hata oluştu.");
    }
  };

  //TODO GÜNCELLEME
  const handleUpdate = async (updatedTodo) => {
    try {
      const todoToUpdate = todos.find((todo) => todo.id === updatedTodo.id);

      if (!todoToUpdate) {
        toast.error("Güncellenecek todo bulunamadı.");
        return;
      }
      const row_id = todoToUpdate.row_id; 
      if (!row_id) {
        toast.error("Todo'nun satır numarası bulunamadı.");
        console.log(error)
        return;
      }
      
      await updateTodo(row_id, updatedTodo);
  
      const updatedTodos = todos.map((todo) =>
        todo.id === updatedTodo.id ? {...updatedTodo,row_id : todo.row_id} : todo
      );
      setTodos(updatedTodos);
      setFilteredTodos(updatedTodos);
      toast.success("Todo başarıyla güncellendi!");
    } catch (error) {
      toast.error("Todo güncellenemedi.");
    }
  };


  //TODO ARAMA
  const onSearch = (e) => {
    const filteredTodos = todos.filter( (todo) => {
      todo.content.toLowerCase().includes(e.toLowerCase())
    })
    setFilteredTodos(filteredTodos)
  }

  //TODO FİLTRELEME
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
      <TodoCreate onCreateTodo={handleCreateTodo} setTodoContent={setTodoContent} todoContent={todoContent}></TodoCreate>

      <Search
      placeholder="Todo ara..."
      enterButton="Search"
      size="large"
      onSearch={onSearch}
      onChange={onChange}
      allowclear
      className = "filter"      
    />

      <TodoList todos={filteredTodos} onRemoveTodo={removeTodo} onUpdateTodo={handleUpdate}></TodoList>
      <ToastContainer autoClose={2000}></ToastContainer>
    </div>

   </div>
  )
}

export default App
