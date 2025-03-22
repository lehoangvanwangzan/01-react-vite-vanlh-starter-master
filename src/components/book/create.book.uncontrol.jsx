import { Form, Input, InputNumber, Modal, notification, Select, Upload } from "antd"
import { useEffect, useState } from "react";
import { CreateBookAPI, handleUploadFile } from "../../services/api.service";
import { PlusOutlined } from "@ant-design/icons";


const CreateBookUncontrolled = (props) => {
    const [form] = Form.useForm()
    const { isCreateOpen, setIsCreateOpen, loadBook } = props;
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loadingCreate, setLoadingCreate] = useState(false);
    const HandleSubmitdButton = async (values) => {
        setLoadingCreate(true)
        if (!selectedFile) {
            notification.error({
                message: "Error create book",
                description: "vui lòng update ảnh thumbnail"
            })
            return;
        }
        //step1: upload file
        const resUpload = await handleUploadFile(selectedFile, "book");
        if (resUpload.data) {
            //success
            const newThumbnail = resUpload.data.fileUploaded;
            const { mainText, author, price, quantity, category } = values;
            const resBook = await CreateBookAPI(newThumbnail, mainText, author, price, quantity, category);
            if (resBook.data) {
                await loadBook();
                notification.success({
                    message: "Create Book Success",
                    description: "Tạo mới book thành công",
                }

                );
            } else {
                notification.error({
                    message: "Create Book Fail",
                    description: JSON.stringify(resBook.message),
                });
            }
        } else {
            //failed
            notification.error({
                message: "Error upload file",
                description: JSON.stringify(resUpload.message),
            });
        }
        setLoadingCreate(false);
        ResetAndCloseModal();
        await loadBook();
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
        setIsCreateOpen(false);
        setSelectedFile(null);
        setPreview(null);
    }

    return (
        <Modal title="Create Book (uncontrolled component)"
            open={isCreateOpen}
            onOk={() => { form.submit() }}
            okButtonProps={{
                loading: loadingCreate
            }}
            onCancel={() => { ResetAndCloseModal() }}
            maskClosable={false}
            okText={"CREATE"}
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
export default CreateBookUncontrolled