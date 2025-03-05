const TodoData = (props) => {
    //props là một opject{}
    const { name, age, data, todoList } = props;
    // const name = props.name;
    // const age = props.age;
    // const Country = props.data.Country;
    // const data = props.data;
    console.log("Check props:", props);
    return (
        <div className='todo-data'>
            <div className='todo-item'>
                <span>{JSON.stringify(props.todoList)}</span>
                <button> Delete</button>
                <button> Edit</button>
            </div>
        </div>
    );
}
export default TodoData;    