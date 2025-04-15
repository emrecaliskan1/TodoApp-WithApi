import React, { useState } from 'react';
import { IoIosRemoveCircle } from "react-icons/io";
import { FaEdit, FaCheck } from "react-icons/fa";
import { Input, Button, Modal,Drawer } from 'antd';
import './Todo.css'


const Todo = ({ todo, onRemoveTodo, onUpdateTodo }) => {
    const { id, content } = todo;

    const [editTable, setEditTable] = useState(false);
    const [newTodo, setNewTodo] = useState(content);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
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

    const handleSaveDetail = () => {
        const updatedTodo = { ...todo, detail }; 
        onUpdateTodo(updatedTodo);
        setIsModalOpen(false); 
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
                <Button 
                type='default'
                className='todo-icon-detail'
                onClick={()=>setIsModalOpen(true)}>
                    Detay Ekle</Button>
                <Button
                type='default'
                className='todo-icon-view'
                onClick={()=>setIsDrawerOpen(true)}>
                    Detayı Gör</Button>
            </div>
            
            <Modal
            title="Detay Ekle"
            open={isModalOpen}
            onOk={handleSaveDetail}
            onCancel={()=>setIsModalOpen(false)}>

            <Input
            placeholder='Detay girin...'
            value={detail}
            onChange={(e)=>setDetail(e.target.value)}></Input>
            </Modal>

            <Drawer
            title="Todo Detayı"
            placement='right'
            onClose={()=>setIsDrawerOpen(false)}
            open={isDrawerOpen}>
                <p><strong>İçerik:</strong> {content}</p>
                <p><strong>Detay:</strong> {detail}</p>
            </Drawer>
        </div>
    );
};

export default Todo;