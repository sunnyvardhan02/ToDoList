document.addEventListener('DOMContentLoaded', function () {
    const taskList = document.getElementById('tasks');
    const newTaskForm = document.getElementById('new-task-form');
    const newTaskInput = document.getElementById('new-task-input');
  
    // Load tasks from local storage
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  
    // Display tasks on page load
    tasks.forEach(function (task) {
      addTaskToDOM(task);
    });
  
    newTaskForm.addEventListener('submit', function (event) {
      event.preventDefault();
      const taskText = newTaskInput.value.trim();
      if (taskText !== '') {
        const newTask = { text: taskText, id: Date.now() };
        tasks.push(newTask);
        addTaskToDOM(newTask);
        saveTasksToLocalStorage();
        newTaskInput.value = '';
      }
    });
  
    function addTaskToDOM(task) {
      const taskDiv = document.createElement('div');
      taskDiv.classList.add('task');
      taskDiv.dataset.taskId = task.id;
  
      const contentDiv = document.createElement('div');
      contentDiv.classList.add('content');
  
      const taskInput = document.createElement('input');
      taskInput.type = 'text';
      taskInput.classList.add('text');
      taskInput.value = task.text;
      taskInput.setAttribute('readonly', 'true');
  
      contentDiv.appendChild(taskInput);
  
      const actionsDiv = document.createElement('div');
      actionsDiv.classList.add('actions');
  
      const editButton = document.createElement('button');
      editButton.classList.add('edit');
      editButton.textContent = 'Edit';
      editButton.addEventListener('click', function () {
        editTask(task.id);
      });
  
      const deleteButton = document.createElement('button');
      deleteButton.classList.add('delete');
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', function () {
        deleteTask(task.id);
      });
  
      actionsDiv.appendChild(editButton);
      actionsDiv.appendChild(deleteButton);
  
      taskDiv.appendChild(contentDiv);
      taskDiv.appendChild(actionsDiv);
  
      taskList.appendChild(taskDiv);
    }
  
    function editTask(taskId) {
      const taskDiv = document.querySelector(`.task[data-task-id="${taskId}"]`);
      const taskInput = taskDiv.querySelector('.text');
      taskInput.removeAttribute('readonly');
      taskInput.focus();
    }
  
    function deleteTask(taskId) {
      tasks = tasks.filter(task => task.id !== taskId);
      saveTasksToLocalStorage();
      const taskDiv = document.querySelector(`.task[data-task-id="${taskId}"]`);
      taskList.removeChild(taskDiv);
    }
  
    function saveTasksToLocalStorage() {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  });



  const express = require('express')
const mongoose = require('mongoose')

const routes = require('./routes/ToDoRoute')

require('dotenv').config()

 const app = express()

const PORT = process.env.port || 5000

mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log('Connected To MongoDB...'))
    .catch((err) => console.log(err))

   app.use(routes)
   
    app.listen(PORT, () => console.log('Listening on: $(PORT}'))