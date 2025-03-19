import { useEffect, useState } from "react"
import { deleteBookAPI, fetchALLBookAPI } from "../../services/api.service";
import { Button, notification, Popconfirm, Table } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const BookTable = () => {
    const [dataBook, setDataBook] = useState([])
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [total, setTotal] = useState(0);

    const [dataDetail, setDataDetail] = useState(null);
    const [isDetailOpen, setDataDetailOpen] = useState(false);

    const [dataUpdate, setDataUpdate] = useState(null);
    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
    const columns = [
        {
            title: 'STT',
            render: (_, record, index) => {
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
                        // setIsDetailOpen(true);
                    }} >{record._id} </a>
                )
            },
        },
        {
            title: 'Tên sách',
            dataIndex: 'mainText',
        },
        {
            title: 'Giá tiền',
            dataIndex: 'price',
            render: (text, record, index) => {
                if (text)
                    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(text)
            }
        },
        {
            title: 'Thể loại',
            dataIndex: 'category',
        },
        {
            title: 'Tác giả',
            dataIndex: 'author',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => {
                return (
                    <div style={{ display: "flex", gap: "20px" }}>
                        <EditOutlined style={{ cursor: "pointer", color: "orange" }}
                            onClick={() => {
                                console.log("click edit")
                                setDataUpdate(record);
                                setIsModalUpdateOpen(true);
                            }}
                        />
                        <Popconfirm
                            title="Xóa sách"
                            description="Bạn chắc chắn xóa sách này?"
                            onConfirm={() => { HandleDeleteBook(record._id) }}
                            okText="Yes"
                            cancelText="No"
                            placement="left"
                        >
                            <DeleteOutlined style={{ cursor: "pointer", color: "red" }} />
                        </Popconfirm>
                    </div>
                )

            }
        },
    ];
    useEffect(() => {
        loadBook();
    }, []); //useEffect chỉ chạy 1 lần để lấy dữ liệu
    const loadBook = async () => {
        const res = await fetchALLBookAPI(current, pageSize);
        console.log("check API book", res)
        if (res.data) {
            setDataBook(res.data.result);
            setCurrent(res.data.meta.current);
            setPageSize(res.data.meta.pageSize);
            setTotal(res.data.meta.total);
        }
    }
    const HandleDeleteBook = async (id) => {
        //xóa book
        const res = await deleteBookAPI(id);
        if (res.data) {
            notification.success({
                message: "Delete sách Success",
                description: "Xóa sách thành công",
            }

            );
        } else {
            notification.error({
                message: "Delete book Fail",
                description: JSON.stringify(res.message),
            });
        }
        await loadBook();
    }
    const onChange = (pagination) => {
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
    }
    return (
        <>
            <div style={{
                padding: "10px",
                display: "flex",
                justifyContent: "space-between"
            }}>
                <h3>Table Book</h3>
                <Button type="primary" onClick={() => { console.log("click me create book") }}>Create Book</Button>
            </div >
            <Table
                columns={columns}
                dataSource={dataBook}
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
                    }
                }
                onChange={onChange}
            />
        </>

    )
}


export default BookTable