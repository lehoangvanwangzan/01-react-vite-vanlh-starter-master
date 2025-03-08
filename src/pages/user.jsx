import UserForm from "../components/user/user.form";
import UserTable from "../components/user/user.table";
import { useState, useEffect } from "react";
import { fetchAllUserAPI } from '../services/api.service';
const UserPage = () => {
    const [dataUsers, setDataUsers] = useState('');
    //emty array run one
    useEffect(() => {
        loadUser();
        // console.log(">>> run render1111")
    }, []); //Biến 2 để mảng rổng thì hàm chỉ chạy 1 lần
    const loadUser = async () => {
        const res = await fetchAllUserAPI();
        setDataUsers(res.data);
        // console.log(">>> run render2222")
    }
    return (
        <div style={{ padding: "20px" }}>
            <UserForm loadUser={loadUser} />
            <UserTable dataUsers={dataUsers} />
        </div >
    );
};
export default UserPage;