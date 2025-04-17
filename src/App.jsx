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
import Navbar from './components/Navbar'
import { Button } from 'antd'


function App() {

  const [todos,setTodos] = useState([])
  const [todoContent, setTodoContent] = useState("");
  const [filteredTodos,setFilteredTodos] = useState([])
  const [isCompleted,setIsCompleted] = useState(false)
  const [selectedDate,setSelectedDate] = useState("")
  const [maxId, setMaxId] = useState(0);
  const [showCompleted, setShowCompleted] = useState(false);

  //USEEFFECT
  useEffect(() => {
    const getTodos = async () => {
      const { todos, maxId } = await fetchTodos();
      setTodos(todos);
      setFilteredTodos(todos);
      setMaxId(maxId)
    };
    getTodos();
    toast.success("TodoList başarıyla veritabanından getirildi...")
  }, []);
  

  //Todo SİLME
  const removeTodo = async (id) => {
    try {

      await deleteTodo(id);
      //todos array'i
      const updatedTodos = todos.filter((todo)=>todo.id !== id)
      setTodos(updatedTodos); 
      setFilteredTodos(updatedTodos);
  
      toast.success("Todo başarıyla silindi.")
    } catch (error) {
      toast.error("Todo silinirken hata oluştu.")
    }
  };


  //TODO YARATMA
  const handleCreateTodo = async () => {
    // const newId = todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) + 1 : 1;
    const newId = maxId +1
    const formattedDate = selectedDate ? new Date(selectedDate).toLocaleDateString("tr-TR") : "";

    try {
      const newTodo = {
        id:newId,
        content: todoContent,
        detail:"",
        isCompleted : false,
        date:formattedDate
      };

      const result = await createTodo(newTodo);

      //eklenen todo objesi
      const addedTodo = {
        id: result.row_id, 
        content: todoContent,
        row_id:result.row_id,
        isCompleted:false,
        date:formattedDate
      };

     
      //güncel todos array'i
      const updatedTodos = [...todos, addedTodo];
      setMaxId(newId)
      setTodos(updatedTodos);
      setFilteredTodos(updatedTodos);
      setTodoContent("");
      setIsCompleted(isCompleted)

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
    <>
   
   <div className='App'>
   <Navbar />
   <br />
    <div className='content-container'>
      <TodoCreate onCreateTodo={handleCreateTodo} setTodoContent={setTodoContent} todoContent={todoContent} setSelectedDate={setSelectedDate}></TodoCreate>

    <div className='searchandbutton'>
      <Search
        placeholder="Todo ara..."
        enterButton="Search"
        size="large"
        onSearch={onSearch}
        onChange={onChange}
        allowclear
        className = "filter"      
      />

      <Button
        className='filter-button'
          type="primary"
          onClick={() => setShowCompleted(!showCompleted)}>
          {showCompleted ? "Tüm Todo'ları Göster" : "Tamamlananları Göster"}
        </Button>
    </div>
    
      <TodoList todos={filteredTodos} onRemoveTodo={removeTodo} onUpdateTodo={handleUpdate}  showCompleted={showCompleted}></TodoList>
     
    </div>
    <ToastContainer autoClose={2000}></ToastContainer>
   </div>
   </>
  )
}

export default App
