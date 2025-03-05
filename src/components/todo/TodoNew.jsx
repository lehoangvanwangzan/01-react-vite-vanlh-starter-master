const TodoNew = (props) => {
    console.log("Check props:", props)
    const { addNewTodo } = props;
    // addNewTodo("Van");
    return (
        <div className='todo-new'>
            <input type='text' placeholder="Nhập văn bản" />
            <button> Add Task</button>
        </div>
    );
}

export default TodoNew;