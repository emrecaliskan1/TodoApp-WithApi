import { useEffect, useState } from 'react'
import './App.css'
import TodoCreate from './components/TodoCreate'
import TodoList from './components/TodoList'
import Search from 'antd/es/transfer/search'
import { ToastContainer, toast } from 'react-toastify';
import {
  fetchTodos,
  fetchTodoById,
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
      console.log("API'den gelen data:", data); // burada kontrol et
      setTodos(data);
      setFilteredTodos(data);
    };
    getTodos();
    toast.success("TodoList başarıyla veritabanından getirildi...")
  }, []);
  
  useEffect(() => {
    console.log("filteredTodos:", filteredTodos);
  }, [filteredTodos]);

  const removeTodo = async (id) => {
    try {
      // Silme işlemini API'ye gönder
      await deleteTodo(id);
  
      // Silinen todo'yu todos listesinden çıkararak güncelle
      const updatedTodos = todos.filter((todo)=>todo.id !== id)
      setTodos(updatedTodos); // State'i güncelle
      setFilteredTodos(updatedTodos); // Filtered todos listesini güncelle
  
      console.log('Todo başarıyla silindi.');
      toast.success("Todo başarıyla silindi.")
      
    } catch (error) {
      console.error('Todo silinirken hata oluştu:', error);
    }
  };


  const handleCreateTodo = async () => {
    try {
      const newTodo = {
        id: Date.now().toString(), 
        content: todoContent,
      };

      const result = await createTodo(newTodo);

      const addedTodo = {
        id: result.row_id, // Sheets'ten dönen gerçek row_id
        content: todoContent,
      };
      const updatedTodos = [...todos, addedTodo];
      setTodos(updatedTodos);
      setFilteredTodos(updatedTodos);
      setTodoContent(""); // Input'u temizle

      toast.success("Todo başarıyla eklendi!");

    } catch (error) {
      toast.error("Todo eklenirken hata oluştu.");
    }
  };


  const handleUpdate = async(updatedTodo)=> {
    try {
      await updateTodo(updatedTodo.id, updatedTodo);
      const updatedTodos = todos.map((todo) =>
        todo.id !== updatedTodo.id ? todo : updatedTodo
      );
      setTodos(updatedTodos);
      setFilteredTodos(updatedTodos);
    } catch (error) {
      console.error('Todo güncellenirken hata oluştu:', error);
    }
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
