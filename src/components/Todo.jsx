import React, { useState } from 'react';
import { IoIosRemoveCircle } from "react-icons/io";
import { FaEdit, FaCheck } from "react-icons/fa";
import { Input, Button, Modal,Drawer } from 'antd';
import './Todo.css'
import TodoDetails from './TodoDetails';


const Todo = ({ todo, onRemoveTodo, onUpdateTodo }) => {
    const { id, content } = todo;

    const [editTable, setEditTable] = useState(false);
    const [newTodo, setNewTodo] = useState(content);
   
    const [detail, setDetail] = useState(todo.detail || '');

    const removeTodo = () => {
        onRemoveTodo(id);
    };

    const updateTodo = () => {
        const request = {
            id: id,
            content: newTodo,
            detail:detail
        };
        onUpdateTodo(request);
        setEditTable(false);
    };

   

    return (
        <div className='todo-item'>
            <div className='todo-content'>
                {
                    editTable ? 
                    <Input 
                        value={newTodo}
                        onChange={(e) => setNewTodo(e.target.value)}
                        className='todo-input-item' 
                    /> : 
                    content
                }
            </div>

            <div className='todo-actions'>
                <Button className='todo-icon-remove' onClick={removeTodo} >
                <IoIosRemoveCircle />
                 </Button>  
                {
                    editTable ? 
                    <Button type="primary" className='todo-icon-check' onClick={updateTodo}>
                        <FaCheck />
                    </Button>
                     :
                    <Button type="default" className='todo-icon-edit' onClick={() => setEditTable(true)}>
                        <FaEdit />
                    </Button>
                }
            </div>
               <TodoDetails todo={todo} onUpdateTodo={onUpdateTodo} />
        </div>
    );
};

export default Todo;