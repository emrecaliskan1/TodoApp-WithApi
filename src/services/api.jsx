import axios from 'axios'

const API_URL = "https://v1.nocodeapi.com/emrecaliskan1/google_sheets/byLERWAtqbZomboi"

export const fetchTodos = async() => {
    try {
        const response = await axios.get(`${API_URL}?tabId=todo-app`)
        return response.data
    } catch (error) {
        console.log('Todolar fetchlenirken hata oluştu.')
        throw error;
    }
}

export const fetchTodoById = async(id) => {
    try {
        const todos = await fetchTodos()
        return todos.find(todo=>todo.id===id)
    } catch (error) {
        console.log("Todo id'ye göre getirilirken hata oluştu.")
        throw error;
    }
}

export const updateTodo = async(id,updatedTodo)=>{
    try {
        const response = await axios.put(`${API_URL}?tabId=todo-app&id=${id}`,updatedTodo)
        return response.data
    } catch (error) {
        console.log("Todo güncellenirken hata oluştu.")
        throw error
    }
}


export const deleteTodo = async(id)=>{
    try {
        const response = await axios.delete(`${API_URL}?tabId=todo-app&row_id=${id}`)
        return response.data
    } catch (error) {
        console.log("Todo silinirken hata oluştu.")
        throw error        
    }
}