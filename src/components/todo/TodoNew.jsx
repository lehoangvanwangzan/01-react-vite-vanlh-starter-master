const TodoNew = (props) => {
    console.log("Check props:", props)
    const { addNewTodo } = props;
    const HandleClicked = () => {
        alert("Clicked");
    }
    const HandleOnChange = (name) => {
        console.log("Change", name);
    }

    return (
        <div className='todo-new'>
            <input type='text' placeholder="Nhập văn bản" onChange={(event) => HandleOnChange(event.target.value)} />
            <button onClick={HandleClicked}> Add Task</button>
        </div>
    );
}

export default TodoNew;