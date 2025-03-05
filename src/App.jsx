import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './components/todo/todo.css'
import TodoNew from './components/todo/TodoNew'
import TodoData from './components/todo/TodoData'

const App = () => {
  const [todoList, setTodoList] = useState([
    { id: 1, name: "Le hoang van 2205", age: 20, address: "Can Tho", Country: "Vietnam" },
    { id: 2, name: "Le hoang van 2206", age: 20, address: "Can Tho", Country: "Vietnam" },
  ])
  const hoidanit = "Le Hoang Van";
  const age = 20;
  const data = {
    name: "Van",
    age: 20,
    address: "Can Tho",
    Country: "Vietnam"
  }
  const addNewTodo = (name) => {
    alert(`Call me ${name}`)
  }

  return (
    <div className="todo-container">
      <div className="todo-title"> Todo List</div>
      <TodoNew
        addNewTodo={addNewTodo} // Truyền hàm xuống component con, để component con gọi hàm này
      />
      <TodoData
        name={hoidanit}
        age={age}
        data={data}
        todoList={todoList}
      />
      <div className="todo-image">
        <img src={reactLogo} className="logo" />
      </div>
    </div>
  )
}

export default App
