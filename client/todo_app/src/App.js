// CORE
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

// CSS
import './App.css';

// API
import { createTaskAPI, listTasks, editTask as editTaskAPI, deleteTask } from './api';

function App() {

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [listatarefas, setlistatarefas] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [id, setId] = useState(null);

  const editButton = (task) => (
    <button
      onClick={() => updateFormForEdit(task)}
      style={{
        backgroundColor: 'blue',
        border: 'none',
        outline: 'none',
        fontSize: '15px',
        padding: '3px',
      }}
    >
      <FontAwesomeIcon style={{ color: 'white' }} icon={faEdit} />
    </button>
  );

  const deleteButton = (task) => (
    <button
      onClick={() => handleDeleteTask(task)}
      style={{
        backgroundColor: 'red',
        border: 'none',
        outline: 'none',
        fontSize: '15px',
        padding: '3px',
      }}
    >
      <FontAwesomeIcon style={{ color: 'white' }} icon={faTrash} />
    </button>
  );

  const handleCreateTask = async (e) => {
    e.preventDefault();
    if(title === '' || description === '' || date === ''){
      alert('Insira todos os campos de cadastro!');
    } else {
      const newTask = { title, description, date };
      if (isUpdate){
        const updatedObject = { id ,title, description, date }
        const updatedTask = await editTaskAPI(updatedObject);
        setlistatarefas([...listatarefas, updatedTask]);
        setTitle('');
        setDescription('');
        setDate('');

        fetchTasks();
        setIsUpdate(false);
      } else {
        const createdTask = await createTaskAPI(newTask);
        setlistatarefas([...listatarefas, createdTask]);
        setTitle('');
        setDescription('');
        setDate('');
      }
    }
  };

  const updateFormForEdit = (task) => {
    setIsUpdate(true);
    setTitle(task.title);
    setDescription(task.description);
    setDate(task.date);
    setId(task.id);
  }

  const handleDeleteTask = async (task) => {
    const updatedTask = await deleteTask(task);
    setlistatarefas(updatedTask);
  }

  const fetchTasks = async () => {
    const list = await listTasks();
    setlistatarefas(list);
  }

  useEffect(()=> {
    fetchTasks();
  }, [])

  return (
    <div className="app">
      <div className="titulo">
        <h1>Tarefas - To Do List</h1>
      </div>
      <div className="container">
        <div className="areas">
          <div className="form">
            <form onSubmit={handleCreateTask}>
              <input placeholder="Titulo" 
                className="styled-input" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
              <input placeholder="Descrição" 
                className="styled-input" type="text" value={description} onChange={(e) => setDescription(e.target.value)}/>
              <input placeholder="Data" 
                className="styled-input" type="text" value={date} onChange={(e) => setDate(e.target.value)}/>
              <button className="styled-button" type="submit">{ !isUpdate ? 'Salvar' : 'Atualizar' }</button>
            </form>
          </div>
        </div>
        <div  style={{ height: '130px', overflowY: 'scroll' }} className="areas">
          <ul style={{ padding:"10px" }}>
          {
            listatarefas.length === 0 ? (
              <h3 style={{ textAlign: 'center' }}>Nada salvo</h3>
            ) : (
              listatarefas.map((lista) => (
                <li key={lista.id}>
                - {lista.title} / Data: <i>{lista.date}</i> <br />
                  {lista.description} - {editButton(lista)} {deleteButton(lista)}
                </li>
              ))
            )}

          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
