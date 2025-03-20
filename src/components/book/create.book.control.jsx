import { Button, Input, InputNumber, Modal, notification, Select } from "antd"
import { useState } from "react";
import { CreateBookAPI, handleUploadFile } from "../../services/api.service";

const CreateBookControl = (props) => {
    const { isCreateOpen, setIsCreateOpen, loadBook } = props;
    const [mainText, setMainText] = useState("");
    const [author, setAuthor] = useState("");
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState("");
    const [category, setCategory] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const HandleSubmitdButton = async () => {
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
        setIsCreateOpen(false);
        setMainText("");
        setAuthor("");
        setPrice(0);
        setQuantity("");
        setCategory("");
        setSelectedFile(null);
        setPreview(null);
    }
    return (
        <div className="user-form" style={{ padding: "10px 0" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h3>Table Book</h3>
                <Button type="primary" onClick={() => { setIsCreateOpen(true) }}>Create User</Button>
            </div>
            <Modal title="Create Book"
                open={isCreateOpen}
                onOk={() => { HandleSubmitdButton() }}
                onCancel={() => { ResetAndCloseModal() }}
                maskClosable={false}
                okText={"CREATE"}
            >
                <div style={{ display: "flex", gap: "15px", flexDirection: "column" }} >
                    <div>
                        <span> Tiêu đề</span>
                        <Input
                            value={mainText}
                            onChange={(event) => { setMainText(event.target.value); }}
                        />
                    </div>
                    <div>
                        <span> Tác giả</span>
                        <Input
                            value={author}
                            onChange={(event) => { setAuthor(event.target.value); }}
                        />
                    </div>
                    <div>
                        <span> Giá tiền</span>
                        <InputNumber
                            style={{ width: "100%" }}
                            addonAfter="VND"
                            value={price}
                            onChange={(event) => { setPrice(event); }}
                        />
                    </div>
                    <div>
                        <span> Số lượng;</span>
                        <InputNumber
                            style={{ width: "100%" }}
                            addonAfter={<span>quyển</span>}
                            value={quantity}
                            onChange={(event) => { setQuantity(event); }}
                        />
                    </div>
                    <div>
                        <span> Thể loại</span>
                        <Select
                            style={{ width: "100%" }}
                            value={category}
                            onChange={(event) => { setCategory(event); }}
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
                </div>
            </Modal>
        </div>
    )
}
export default CreateBookControl