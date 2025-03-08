import React from 'react';
import { Table } from 'antd';
import { fetchAllUserAPI } from '../../services/api.service';
import { useState, useEffect } from "react";
const UserTable = () => {
    const [dataUsers, setDataUsers] = useState('');
    const columns = [
        {
            title: 'ID',
            dataIndex: '_id',
        },
        {
            title: 'Full Name',
            dataIndex: 'fullName',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        }
    ];
    //emty array run one
    useEffect(() => {
        loadUser();
        // console.log(">>> run render1111")
    }, []);
    const loadUser = async () => {
        const res = await fetchAllUserAPI();
        setDataUsers(res.data);
        // console.log(">>> run render2222")
    }
    // console.log(">>> run render0000")
    return (
        <Table columns={columns} dataSource={dataUsers} rowKey={"_id"} />
    );

}


export default UserTable;