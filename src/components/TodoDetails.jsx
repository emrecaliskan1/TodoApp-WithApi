import React, { useState } from 'react';
import { Input, Modal, Drawer, Button } from 'antd';
import './TodoDetails.css'

const TodoDetails = ({ todo, onUpdateTodo }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [detail, setDetail] = useState(todo.detail || ''); 
  

  const handleSaveDetail = () => {
    const updatedTodo = { ...todo, detail }; 
    onUpdateTodo(updatedTodo); 
    setIsModalOpen(false); 
  };

  return (
    <>
      <Button
        type="default"
        className="todo-icon-detail"
        onClick={() => setIsModalOpen(true)}
      >
        Detay Ekle
      </Button>

      <Button
        type="default"
        className="todo-icon-view"
        onClick={() => setIsDrawerOpen(true)}
      >
        Detayı Gör
      </Button>

      <Modal
        title="Detay Ekle"
        open={isModalOpen}
        onOk={handleSaveDetail}
        onCancel={() => setIsModalOpen(false)}
      >
        <Input
          placeholder="Detay girin..."
          value={detail} 
          onChange={(e) => setDetail(e.target.value)} 
        />
      </Modal>

      <Drawer
        title="Todo Detayı"
        placement="right"
        onClose={() => setIsDrawerOpen(false)} 
        open={isDrawerOpen}
        className='ant-drawer-body'
      >
        <p><strong>İçerik:</strong> {todo.content}</p>
        <p><strong>Detay:</strong> {todo.detail ? todo.detail : 'Detay yok'}</p>
      </Drawer>
    </>
  );
};

export default TodoDetails;