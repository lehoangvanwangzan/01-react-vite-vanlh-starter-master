import React from 'react';
import { Table, notification, Popconfirm, Pagination } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import UpdateUserModal from './update.user.modal';
import { useState } from 'react';
import ViewUserDetail from './view.user.detail';
import { deleteUserAPI } from "../../services/api.service";

const UserTable = (props) => {
    const { dataUsers, loadUser, current, pageSize, total
        , setCurrent, setPageSize
    } = props;
    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
    const [dataUpdate, setDataUpdate] = useState(null);
    const [dataDetail, setDataDetail] = useState(null);
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const columns = [
        {
            title: "STT",
            render: (_, record, index) => {
                console.log(">>>check index:", index, current)
                return (
                    <>
                        {(index + 1) + (current - 1) * pageSize}
                    </>
                )
            }

        },
        {
            title: 'ID',
            dataIndex: '_id',
            render: (_, record) => {
                return (
                    <a href='#' onClick={() => {
                        setDataDetail(record)
                        setIsDetailOpen(true);
                    }} >{record._id} </a>
                )
            },
        },
        {
            title: 'Full Name',
            dataIndex: 'fullName',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: (_, record) => {
                return (
                    <div style={{ display: "flex", gap: "30px" }}>
                        <EditOutlined style={{ cursor: "pointer", color: "orange" }} onClick={() => {
                            setDataUpdate(record);
                            setIsModalUpdateOpen(true);
                        }} />
                        <Popconfirm
                            title="Xóa người dùng"
                            description="Bạn chắc chắn xóa user này?"
                            onConfirm={() => { HandleDeleteUser(record._id) }}
                            okText="Yes"
                            cancelText="No"
                            placement="left"
                        >
                            <DeleteOutlined style={{ cursor: "pointer", color: "red" }} />
                        </Popconfirm>
                    </div>
                )
            },
        },
    ];
    const HandleDeleteUser = async (id) => {
        const res = await deleteUserAPI(id);
        if (res.data) {
            notification.success({
                message: "Delete User Success",
                description: "Xóa user thành công",
            }

            );
        } else {
            notification.error({
                message: "Delete User Fail",
                description: JSON.stringify(res.message),
            });
        }
        await loadUser();
    }
    const onChange = (pagination, filters, sorter, extra) => {
        //nếu thay đổi trang:current
        if (pagination && pagination.current) {
            if (+pagination.current !== +current) {
                setCurrent(+pagination.current) //convert"string" => int
            }
        }
        //nến thay đổi tổng số phần tử :pageSize
        if (pagination && pagination.pageSize) {
            if (+pagination.pageSize !== +pageSize) {
                setPageSize(+pagination.pageSize) //convert"string" => int
            }
        }
        // console.log(">>>check ", { pagination, filters, sorter, extra })
    }
    return (
        <>
            <Table
                columns={columns}
                dataSource={dataUsers}
                rowKey={"_id"}
                pagination={
                    {
                        current: current,
                        pageSize: pageSize,
                        showSizeChanger: true,
                        total: total,
                        showTotal: (total, range) => {
                            return (
                                <div>
                                    {range[0]}-{range[1]} trên {total} rows
                                </div>
                            )
                        }
                    }}
                onChange={onChange}
            />
            <UpdateUserModal
                isModalUpdateOpen={isModalUpdateOpen}
                setIsModalUpdateOpen={setIsModalUpdateOpen}
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
                loadUser={loadUser}
            />
            <ViewUserDetail
                dataDetail={dataDetail}
                setDataDetail={setDataDetail}
                isDetailOpen={isDetailOpen}
                setIsDetailOpen={setIsDetailOpen}
                loadUser={loadUser}
            />
        </>
    );

}


export default UserTable;