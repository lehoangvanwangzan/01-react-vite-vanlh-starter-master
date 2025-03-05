import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './components/todo/todo.css'
import TodoNew from './components/todo/TodoNew'
import TodoData from './components/todo/TodoData'

const App = () => {
  return (
    <div className="todo-container">
      <div className="todo-title"> Todo List</div>
      <TodoNew />
      <TodoData />
      <div className="todo-image">
        <img src={reactLogo} className="logo" />
      </div>
    </div>
  )
}

export default App
