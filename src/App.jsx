import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './components/todo/todo.css'
import TodoNew from './components/todo/TodoNew'
import TodoData from './components/todo/TodoData'

const App = () => {
  const hoidanit = "Le Hoang Van";
  const age = 20;
  const data = {
    name: "Van",
    age: 20,
    address: "Can Tho",
    Country: "Vietnam"
  }
  return (
    <div className="todo-container">
      <div className="todo-title"> Todo List</div>
      <TodoNew />
      <TodoData
        name={hoidanit}
        age={age}
        data={data}
      />
      <div className="todo-image">
        <img src={reactLogo} className="logo" />
      </div>
    </div>
  )
}

export default App
