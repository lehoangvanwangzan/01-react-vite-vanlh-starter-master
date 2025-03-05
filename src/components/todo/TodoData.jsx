const TodoData = (props) => {
    //props là một opject{}
    const { todoList } = props;
    // console.log("Check props:", props);
    return (
        <div className='todo-data'>
            {todoList.map((item, index) => {
                console.log("Check item:", item);
                return (
                    <div className="todo-item" key={index.id}>
                        <div>{item.id}</div>
                        <div>{item.name}</div>
                        <div>{item.address}</div>
                        <button>Delete</button>
                        <button>Edit</button>
                    </div>
                )
            }
            )}
        </div>
    );
}
export default TodoData;    //export default TodoData; để có thể import TodoData ở các file khác