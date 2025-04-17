import axios from 'axios'

const API_URL = "https://v1.nocodeapi.com/zenvero/google_sheets/kSIqVTzpLrTGHUdv"

//FETCH
export const fetchTodos = async() => {  
    try {
        const response = await axios.get(`${API_URL}?tabId=todo`);
    
        const rows = response.data.data;

        const todos = rows.map(row => ({
          row_id:row.row_id,
          id: row.row_id,
          content: row.content,
          detail:row.detail,
          isCompleted: row.isCompleted === true || row.isCompleted === "TRUE",
          date:row.date
        }));
        
        const maxId = todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) : 0;
        return { todos, maxId }

      } catch (error) {
        console.error('fetchTodos hatası:', error);
        return [];
      }
}

//SİLME
export const deleteTodo = async (rowId) => {
    try {
      const response = await axios.delete(`${API_URL}?tabId=todo&row_id=${rowId}`);
      return response.data;

    } catch (error) {
      console.log("Todo silinirken hata oluştu.");
      throw error;
    }
};

//OLUŞTUR
export const createTodo = async (newTodo) => {
    try {
      const response = await axios.post(`${API_URL}?tabId=todo`, [
        [newTodo.id, newTodo.content,newTodo.detail,newTodo.isCompleted,newTodo.date] 
      ]);
    
      return response.data;
    } catch (error) {
      console.error("Todo eklenirken hata oluştu:", error);
      throw error;
    }
};


//GÜNCELLE
export const updateTodo = async (row_id,updatedTodo) => {
    try {
      const response = await axios.put(`${API_URL}?tabId=todo`, {
        row_id: row_id,   
        content: updatedTodo.content ,
        detail:updatedTodo.detail,
        isCompleted:updatedTodo.isCompleted,
        date: updatedTodo.date
      });
      return response.data;

    } catch (error) {
      throw error;
    }
};