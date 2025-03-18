import { useState } from 'react'
import reactLogo from '../../assets/react.svg'
import './todo.css'
import TodoNew from './TodoNew'
import TodoData from './TodoData'
const TodoApp = () => {
    const [todoList, setTodoList] = useState([
        // { id: 1, name: "Le hoang van 2205", age: 33, address: "Can Tho", Country: "Vietnam" },
        // { id: 2, name: "Le hoang van 2206", age: 44, address: "Can Tho", Country: "Vietnam" },
    ])
    const addNewTodo = (name, address) => {
        const newTodo = {
            // id: randomIntFromInterval(1, 1000),
            id: todoList.length + 1,
            name: name,
            address: address
        }
        setTodoList([...todoList, newTodo]) // Thêm phần tử mới vào mảng
    }
    const deleteTodo = (id) => {
        const newTodoList = todoList.filter((item) => item.id !== id)
        setTodoList(newTodoList);
        console.log(newTodoList);
    }
    // const randomIntFromInterval = (min, max) => {  // min and max included
    //     return Math.floor(Math.random() * (max - min + 1) + min)
    // }
    return (
        <div className="todo-container">
            <div className="todo-title"> Todo List</div>
            <TodoNew
                addNewTodo={addNewTodo} // Truyền hàm xuống component con, để component con gọi hàm này
            />
            {todoList.length > 0 ?
                <TodoData
                    todoList={todoList}
                    deleteTodo={deleteTodo}
                />
                :
                <div className="todo-image">
                    <img src={reactLogo} className="logo" />
                </div>
            }
        </div>

    )
}


export default TodoApp;    //export default TodoApp; để có thể import TodoApp ở các file khác   