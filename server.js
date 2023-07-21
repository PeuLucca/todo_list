const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const app = express();
const cors = require('cors');
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

let tasks = [];

// cadastrar task
app.post('/api/tasks', (req, res) => {
    const { title, description, date } = req.body;
    if (!title || !description || !date) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }
  
    const newTask = { id: uuidv4(), title, description, date };
    tasks.push(newTask);
    return res.status(201).json(newTask);
  });

// listar task
app.get('/api/tasks', (req, res) => {
    return res.json(tasks);
  });

  // editar task
app.put('/api/tasks/:id', (req, res) => {
    const taskId = req.params.id;
    const { title, description, date } = req.body;
  
    if (!title || !description || !date) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }
  
    const taskIndex = tasks.findIndex((task) => task.id === taskId);
  
    if (taskIndex === -1) {
      return res.status(404).json({ error: 'Tarefa não encontrada.' });
    }
  
    tasks[taskIndex] = { id: taskId, title, description, date };
  
    return res.json(tasks[taskIndex]);
  });  

// deletar task
app.delete('/api/tasks/:id', (req, res) => {
    const taskId = req.params.id;
    const { title, description, date } = req.body;
  
    if (!title || !description || !date) {
      return res.status(400).json({ error: 'Tarefa faltando campos!' });
    }

    const taskIndex = tasks.findIndex((task) => task.id === taskId);
  
    if (taskIndex === -1) {
      return res.status(404).json({ error: `Tarefa não encontrada.` });
    }
  
    tasks.splice(taskIndex, 1);
  
    return res.json(tasks);
})


app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
})
