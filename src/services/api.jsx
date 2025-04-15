import axios from 'axios'

const API_URL = "https://v1.nocodeapi.com/emrecaliskan2/google_sheets/heXwOgUlLJVBmSht"

export const fetchTodos = async() => {  
    try {
        const response = await axios.get(`${API_URL}?tabId=todo`);
    
        const rows = response.data.data;

        const todos = rows.map(row => ({
          id: row.row_id,
          content: row.content,
          row_id:row.row_id,
          detail:row.detail
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
        [newTodo.id, newTodo.content] 
      ]);
    
      return response.data;
    } catch (error) {
      console.error("Todo eklenirken hata oluştu:", error);
      throw error;
    }
};


export const updateTodo = async (row_id,updatedTodo) => {
    try {
      const response = await axios.put(`${API_URL}?tabId=todo`, {
        row_id: row_id,  
        id: updateTodo.id,  
        content: updatedTodo.content ,
        detail:updatedTodo.detail
      });
      return response.data;

    } catch (error) {
      throw error;
    }
};