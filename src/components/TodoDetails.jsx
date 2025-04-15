import React, { useState } from 'react';
import { Input, Modal, Drawer, Button } from 'antd';
import './TodoDetails.css'

const TodoDetails = ({ todo, onUpdateTodo,isCompleted }) => {
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
        okText="Kaydet"
        cancelText="İptal"
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
        <p><strong>Tamamlanma Durumu: </strong>{isCompleted ? 'Tamamlandı' : 'Tamamlanmadı'} </p>
      </Drawer>
    </>
  );
};

export default TodoDetails;