import React from 'react';
import { Table } from 'antd';


const UserTable = (props) => {
    const { dataUsers } = props;
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

    // console.log(">>> run render0000")
    return (
        <Table columns={columns} dataSource={dataUsers} rowKey={"_id"} />
    );

}


export default UserTable;