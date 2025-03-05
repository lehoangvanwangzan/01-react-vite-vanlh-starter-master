import { useState } from 'react';
const TodoNew = (props) => {
    //useState hook
    const [valueInput, setValueInput] = useState("van"); // valueInput là state, setValueInput là hàm để thay đổi state
    const { addNewTodo } = props;
    const HandleClicked = () => {
        alert(`Call me ${valueInput}`);
    }
    const HandleOnChange = (name) => {
        // console.log("Change", name);
        setValueInput(name);
    }

    return (
        <div className='todo-new'>
            <input type='text' placeholder="Nhập văn bản" onChange={(event) => HandleOnChange(event.target.value)} />
            <button onClick={HandleClicked}> Add Task</button>
        </div>
    );
}

export default TodoNew;