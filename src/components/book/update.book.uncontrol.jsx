import { Form, Input, InputNumber, Modal, notification, Select } from "antd"
import { useEffect, useState } from "react";
import { handleUploadFile, UpdateBookAPI } from "../../services/api.service";

const UpdateBookUncontrolled = (props) => {
    const { dataUpdate, setDataUpdate, isModalUpdateOpen, setIsModalUpdateOpen, loadBook } = props;
    const [form] = Form.useForm()
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);
    useEffect(() => {
        if (dataUpdate && dataUpdate._id) {
            form.setFieldsValue({
                id: dataUpdate._id,
                mainText: dataUpdate.mainText,
                author: dataUpdate.author,
                price: dataUpdate.price,
                quantity: dataUpdate.quantity,
                category: dataUpdate.category

            })
            setPreview(`${import.meta.env.VITE_BACKEND_URL}/images/book/${dataUpdate.thumbnail}`)
        }
    }, [dataUpdate])
    const UpdateBook = async (newThumbnail, values) => {
        const { id, mainText, author, price, quantity, category } = values;
        const resBook = await UpdateBookAPI(
            id, newThumbnail, mainText, author, price, quantity, category
        );
        if (resBook.data) {
            ResetAndCloseModal();
            await loadBook();
            notification.success({
                message: "Update book",
                description: "Cập nhật book thành công"
            })
        } else {
            notification.error({
                message: "Error update book",
                description: JSON.stringify(resBook.message)
            })
        }

    }
    const HandleSubmitdButton = async (values) => {
        //không có ảnh preview + không có file => return
        if (!selectedFile && !preview) {
            notification.error({
                message: "Error update book",
                description: "vui lòng update ảnh thumbnail"
            })
            return;
        }
        let newThumbnail = "";
        if (!selectedFile && preview) {
            newThumbnail = dataUpdate.thumbnail;
        } else {
            const resUpload = await handleUploadFile(selectedFile, "book");
            if (resUpload.data) {
                //success
                newThumbnail = resUpload.data.fileUploaded;

            } else {
                //failed
                notification.error({
                    message: "Error upload file",
                    description: JSON.stringify(resUpload.message),
                });
                return;
            }
        }
        await UpdateBook(newThumbnail, values);
    }
    const HandleOnChangeFile = (event) => {
        if (!event.target.files || event.target.files.length === 0) {
            setSelectedFile(null);
            setPreview(null);
            return
        }

        // I've kept this example simple by using the first image instead of multiple
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreview(URL.createObjectURL(file));
        }
    }
    const ResetAndCloseModal = () => {
        form.resetFields();
        setSelectedFile(null);
        setPreview(null);
        setDataUpdate(null);
        setIsModalUpdateOpen(false);
    }
    return (
        <Modal title="Create Book (uncontrolled component)"
            open={isModalUpdateOpen}
            onOk={() => { form.submit() }}
            onCancel={() => { ResetAndCloseModal() }}
            maskClosable={false}
            okText={"UPDATE"}
        >
            <Form
                form={form}
                layout="vertical"
                name="basic"
                onFinish={HandleSubmitdButton}
                style={{
                    // maxWidth: 1800,
                    margin: "30px"
                }}
            >
                <div>
                    <Form.Item
                        label="ID"
                        name="id"
                    >
                        <Input disabled />
                    </Form.Item>
                </div>
                <div>
                    <Form.Item
                        label="Tiêu đề"
                        name="mainText"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập tên sách!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </div>
                <div>
                    <Form.Item
                        label="Tác giả"
                        name="author"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập tên tác giả!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </div>
                <div>
                    <Form.Item
                        label="Giá tiền"
                        name="price"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập giá tiền!',
                            },
                        ]}
                    >
                        <InputNumber
                            style={{ width: "100%" }}
                            addonAfter="VND"
                        />
                    </Form.Item>
                </div>
                <div>
                    <Form.Item
                        label="Số lượng"
                        name="quantity"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập số lượng!',
                            },
                        ]}
                    >
                        <InputNumber
                            style={{ width: "100%" }}
                            addonAfter={<span>quyển</span>}

                        />
                    </Form.Item>
                </div>
                <div>
                    <Form.Item
                        label="Thể loại"
                        name="category"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng chọn thể loại!',
                            },
                        ]}
                    >
                        <Select
                            style={{ width: "100%" }}
                            name="category"
                            options={[
                                { value: 'Arts', label: 'Arts' },
                                { value: 'Business', label: 'Business' },
                                { value: 'Comics', label: 'Comics' },
                                { value: 'Cooking', label: 'Cooking' },
                                { value: 'Entertainment', label: 'Entertainment' },
                                { value: 'History', label: 'History' },
                                { value: 'Music', label: 'Music' },
                                { value: 'Sports', label: 'Sports' },
                                { value: 'Teen', label: 'Teen' },
                                { value: 'Travel', label: 'Travel' },

                            ]}
                        />
                    </Form.Item>
                </div>
                <div>
                    <div> Ảnh thumbnail</div>
                    <div>
                        <label htmlFor="btnUpload" style={{
                            display: "block",
                            width: "fit-content",
                            marginTop: "15px",
                            padding: "5px 10px",
                            background: "orange",
                            borderRadius: "5px",
                            cursor: "pointer"
                        }}>
                            Upload file ảnh
                        </label>
                        <input
                            type='file' hidden id='btnUpload'
                            onChange={(event) => { HandleOnChangeFile(event) }}
                            onClick={(event) => {
                                event.target.value = null
                            }}
                            style={{ display: "none" }}
                        />
                    </div>
                    {preview &&
                        <>
                            <div style={{
                                marginTop: "10px",
                                marginBottom: "15px",
                                height: "100px", width: "150px",
                            }}>
                                <img style={{ height: "100px", width: "100px", objectFit: "fill" }}
                                    src={preview}
                                ></img>
                            </div>
                        </>
                    }
                </div>

            </Form>
        </Modal >
    )
}
export default UpdateBookUncontrolled