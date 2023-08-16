import React, { useState,useEffect } from 'react';
import './App.css';

const LOCAL_STORAGE_KEY = 'todoApp.todos';

function App() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(()=>{
    console.log('Fetching todos from local storage...');
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if(storedTodos)
    { console.log('Stored todos found:', storedTodos);
    setTodos(storedTodos);}
  }, []);

  useEffect(()=>{
    console.log('Updating todos in local storage...');
    localStorage.setItem(LOCAL_STORAGE_KEY,JSON.stringify(todos))

  },[todos]);

  const addTodo = () => {
    if (inputValue.trim() !== '') {
      const newTodo = {
        id: new Date().getTime(),
        text: inputValue,
        completed: false,
      };
      setTodos([...todos, newTodo]);
      setInputValue('');
    }
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };
  

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const filteredTodos = todos.filter(todo => {
    if (activeTab === 'all') {
      return true;
    } else if (activeTab === 'active') {
      return !todo.completed;
    } else {
      return todo.completed;
    }
  });

  return ( 
    <div className={`App ${darkMode ? 'dark' : ''}`}>
      
  <div className="header">
    <h1 className="todo-header">TODO </h1>
 
  <i class="fa fa-toggle-on" aria-hidden="true" onClick={() => setDarkMode(!darkMode)}
      >DARK MODE</i>
</div>

      <div className="todo-container">
        <div className="input-container">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter a new task"
            className="search-bar"
          />
          <button id="add" className="add" onClick={addTodo}>ADD</button>
        </div>
        <div className="tabs" >
          <button onClick={() => setActiveTab('all')}>All</button>
          <button onClick={() => setActiveTab('active')}>Active</button>
          <button onClick={() => setActiveTab('completed')}>Completed</button>
        </div>
        <ul className="todo-list">
          {filteredTodos.map(todo => (
            <li key={todo.id}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
              />
              <span className={`todo-text ${todo.completed ? 'completed' : ''}`}>
                {todo.text}
              </span>
              <i className="fa fa-trash" aria-hidden="true"  onClick={() => deleteTodo(todo.id)}>
                
              </i> 
  

            </li>
          ))}
        </ul>
<div className="task-info">
  <p className="total-tasks">Total tasks: {todos.length}</p>
  <button className="clear-completed" onClick={clearCompleted}>
    Clear Completed
  </button>
</div>

      </div>
    </div>
  );
}

export default App;
