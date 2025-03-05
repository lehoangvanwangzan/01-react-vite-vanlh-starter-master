import { useState } from 'react';
const TodoNew = (props) => {
    //useState hook
    const [valueInput, setValueInput] = useState(); // valueInput là state, setValueInput là hàm để thay đổi state
    const { addNewTodo } = props;
    const HandleClicked = () => {
        addNewTodo(valueInput);
        setValueInput(" ");
    }
    const HandleOnChange = (name) => {
        // console.log("Change", name, address);
        setValueInput(name);
    }

    return (
        <div className='todo-new'>
            <input type='text' placeholder="Nhập tên" onChange={(event) => {
                HandleOnChange(event.target.value)
            }}
                value={valueInput}
            />
            <button onClick={HandleClicked}> Add Task</button>
        </div>
    );
}

export default TodoNew;