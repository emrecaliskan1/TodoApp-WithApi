import axios from 'axios'

const API_URL = "https://v1.nocodeapi.com/emrecaliskan3/google_sheets/ssMtuaRETkWrmVFt"

//FETCH
export const fetchTodos = async() => {  
    try {
        const response = await axios.get(`${API_URL}?tabId=todo`);
    
        const rows = response.data.data;

        const todos = rows.map(row => ({
          id: row.row_id,
          content: row.content,
          row_id:row.row_id,
          detail:row.detail,
          isCompleted: row.isCompleted === true || row.isCompleted === "TRUE"
        }));
    
        return todos;

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
        [newTodo.id, newTodo.content,newTodo.detail,newTodo.isCompleted] 
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
        isCompleted:updatedTodo.isCompleted
      });
      return response.data;

    } catch (error) {
      throw error;
    }
};