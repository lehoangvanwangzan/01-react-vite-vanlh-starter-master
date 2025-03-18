import UserForm from "../components/user/user.form";
import UserTable from "../components/user/user.table";
import { useState, useEffect } from "react";
import { fetchAllUserAPI } from '../services/api.service';
const UserPage = () => {
    const [dataUsers, setDataUsers] = useState([]);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [total, setTotal] = useState(0);

    //empty array run one
    //not empty = > check next value !== pre value
    useEffect(() => {
        loadUser();
    }, [current, pageSize]); //Biến 2 để mảng rổng thì hàm chỉ chạy 1 lần
    //[] + condition
    const loadUser = async () => {
        const res = await fetchAllUserAPI(current, pageSize);
        if (res.data) {
            setDataUsers(res.data.result);
            setCurrent(res.data.meta.current);
            setPageSize(res.data.meta.pageSize);
            setTotal(res.data.meta.total);
        }
    }

    return (
        <div style={{ padding: "20px" }}>
            <UserForm loadUser={loadUser} />
            <UserTable
                dataUsers={dataUsers}
                loadUser={loadUser}
                current={current}
                pageSize={pageSize}
                total={total}
                setCurrent={setCurrent}
                setPageSize={setPageSize}
            />

        </div >
    );
};
export default UserPage;