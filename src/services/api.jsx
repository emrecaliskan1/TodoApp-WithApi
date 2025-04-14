import axios from 'axios'

const API_URL = "https://v1.nocodeapi.com/emrecaliskan1/google_sheets/HuNGWxpnnfYYLDyq"

export const fetchTodos = async() => {  
    try {
        const response = await axios.get(`${API_URL}?tabId=todo`);
        console.log("API'den gelen tüm response:", response.data);
    
        const rows = response.data.data;
        console.log("Sheet verisi:", rows);
    
        const todos = rows.map(row => ({
          id: row.row_id,
          content: row.content
        }));
    
        return todos;
      } catch (error) {
        console.error('fetchTodos hatası:', error);
        return [];
      }
}

export const deleteTodo = async (rowId) => {
    try {
      const response = await axios.delete(`${API_URL}?tabId=todo&row_id=${rowId}`);
      return response.data;
    } catch (error) {
      console.log("Todo silinirken hata oluştu.");
      throw error;
    }
  };

export const fetchTodoById = async(id) => {
    try {
        const todos = await fetchTodos()
        return todos.find(todo=>todo.id===id)
    } catch (error) {
        console.log("Todo id'ye göre getirilirken hata oluştu.")
        throw error;
    }
}

export const createTodo = async (newTodo) => {
    try {
      const response = await axios.post(`${API_URL}?tabId=todo`, [
        [newTodo.id, newTodo.content] // 2 sütun varsa (id ve content)
      ]);
    
  
  
      console.log("Todo Sheets'e kaydedildi:", response.data);
      return response.data;
    } catch (error) {
      console.error("Todo eklenirken hata oluştu:", error);
      throw error;
    }
  };

export const updateTodo = async(id,updatedTodo)=>{
    try {
        const response = await axios.put(`${API_URL}?tabId=todo`, {
          row: row, // Sheet'teki satır numarası (1-based index)
          data: [updatedTodo.id.toString(), updatedTodo.content]
        });
        return response.data;
      } catch (error) {
        console.error("Todo güncellenirken hata oluştu:", error);
        throw error;
      }
}

