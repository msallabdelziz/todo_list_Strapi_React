import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoItem from './TodoItem';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

// Styled components
const Container = styled.div`
  max-width: 800px;
  margin: auto;
  padding: 20px;
  font-family: Arial, sans-serif;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 20px;
  color: #333;
`;

const Table = styled(motion.table)`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
`;

const Th = styled.th`
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
  background-color: #f4f4f4;
`;

const Tr = styled(motion.tr)`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

const FormContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

const Input = styled.input`
  font-size: 1em;
  padding: 10px;
  margin-right: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 300px;
`;

const Button = styled(motion.button)`
  padding: 10px 20px;
  font-size: 1em;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const formVariants = {
  hidden: { opacity: 0, y: -50 },
  visible: { opacity: 1, y: 0 },
};

const App = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  // Fetch todos from the API
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get('http://localhost:1337/api/todo-lists');
      setTodos(response.data.data);
    } catch (error) {
      console.error('Error fetching todos', error);
    }
  };

  // Add a new todo
  const addTodo = async () => {
    try {
      const response = await axios.post('http://localhost:1337/api/todo-lists', {
        data: { detail_tache: newTodo, status: 'à faire' },
      });
      setTodos([...todos, response.data.data]);
      setNewTodo('');
    } catch (error) {
      console.error('Error adding todo', error);
    }
  };

  // Update an existing todo
  const updateTodo = async (id, updatedDetail, status) => {
    try {
      const response = await axios.put(`http://localhost:1337/api/todo-lists/${id}`, {
        data: { detail_tache: updatedDetail, status },
      });
      setTodos(todos.map(todo => (todo.id === id ? response.data.data : todo)));
    } catch (error) {
      console.error('Error updating todo', error);
    }
  };

  // Delete a todo
  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:1337/api/todo-lists/${id}`);
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (error) {
      console.error('Error deleting todo', error);
    }
  };

  return (
    <Container>
      <Title>Liste des taches</Title>
      <FormContainer
        variants={formVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5 }}
      >
        <Input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Ajouter une nouvelle tâche"
        />
        <Button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={addTodo}>
          Ajouter
        </Button>
      </FormContainer>
      <Table layout>
        <thead>
          <Tr>
            <Th>Liste des taches</Th>
            <Th>État</Th>
            <Th>Actions</Th>
          </Tr>
        </thead>
        <tbody>
          <AnimatePresence>
            {todos.map(todo => (
              <Tr
                key={todo.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
              >
                <TodoItem todo={todo} updateTodo={updateTodo} deleteTodo={deleteTodo} />
              </Tr>
            ))}
          </AnimatePresence>
        </tbody>
      </Table>
    </Container>
  );
};

export default App;
