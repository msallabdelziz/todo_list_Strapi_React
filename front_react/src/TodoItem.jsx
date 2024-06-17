import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Td = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
`;

const Input = styled.input`
  font-size: 1em;
  padding: 5px;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 100%;
`;

const Select = styled.select`
  padding: 5px;
  border-radius: 4px;
`;

const Button = styled(motion.button)`
  padding: 5px 10px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #218838;
  }

  &:not(:last-child) {
    margin-right: 10px;
  }
`;

const DeleteButton = styled(Button)`
  background-color: #dc3545;

  &:hover {
    background-color: #c82333;
  }
`;

const TodoItem = ({ todo, updateTodo, deleteTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [detail, setDetail] = useState(todo.attributes.detail_tache);
  const [status, setStatus] = useState(todo.attributes.status || 'à faire');

  // Handle update
  const handleUpdate = () => {
    updateTodo(todo.id, detail, status);
    setIsEditing(false);
  };

  return (
    <>
      <Td>
        {isEditing ? (
          <Input
            type="text"
            value={detail}
            onChange={(e) => setDetail(e.target.value)}
          />
        ) : (
          detail
        )}
      </Td>
      <Td>
        {isEditing ? (
          <Select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="à faire">À faire</option>
            <option value="en cours">En cours</option>
            <option value="complété">Complété</option>
          </Select>
        ) : (
          status
        )}
      </Td>
      <Td>
        {isEditing ? (
          <Button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleUpdate}
          >
            Sauvegarder
          </Button>
        ) : (
          <Button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsEditing(true)}
          >
            Modifier
          </Button>
        )}
        <DeleteButton
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => deleteTodo(todo.id)}
        >
          Supprimer
        </DeleteButton>
      </Td>
    </>
  );
};

export default TodoItem;
