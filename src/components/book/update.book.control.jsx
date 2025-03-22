import { Input, InputNumber, Modal, notification, Select } from "antd"
import { useEffect, useState } from "react";
import { handleUploadFile, UpdateBookAPI } from "../../services/api.service";

const UpdateBookControl = (props) => {
    const { dataUpdate, setDataUpdate, isModalUpdateOpen, setIsModalUpdateOpen, loadBook } = props;
    const [id, setId] = useState("");
    const [mainText, setMainText] = useState("");
    const [author, setAuthor] = useState("");
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState("");
    const [category, setCategory] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);

    useEffect(() => {
        if (dataUpdate && dataUpdate._id) {
            setId(dataUpdate._id);
            setMainText(dataUpdate.mainText)
            setAuthor(dataUpdate.author)
            setPrice(dataUpdate.price)
            setQuantity(dataUpdate.quantity)
            setCategory(dataUpdate.category)
            setPreview(`${import.meta.env.VITE_BACKEND_URL}/images/book/${dataUpdate.thumbnail}`)

        }

    }, [dataUpdate])
    const UpdateBook = async (newThumbnail) => {
        const resBook = await UpdateBookAPI(
            id, newThumbnail, mainText, author, price, quantity, category
        );
        if (resBook.data) {
            await loadBook();
            ResetAndCloseModal();

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
    const HandleSubmitdButton = async () => {
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
        await UpdateBook(newThumbnail);
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
        setId("");
        setMainText("");
        setAuthor("");
        setPrice(0);
        setQuantity("");
        setCategory("");
        setSelectedFile(null);
        setPreview(null);
        setDataUpdate(null);
        setIsModalUpdateOpen(false);
    }
    return (
        <div className="user-form" style={{ padding: "10px 0" }}>
            <Modal title="Create Book"
                open={isModalUpdateOpen}  // mở modal 
                onOk={() => { HandleSubmitdButton() }}
                onCancel={() => { ResetAndCloseModal() }}
                maskClosable={false}
                okText={"CREATE"}
            >
                <div style={{ display: "flex", gap: "15px", flexDirection: "column" }} >
                    <div>
                        <span> ID</span>
                        <Input
                            value={id}
                            disabled
                        />
                    </div>
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
                        <span> Số lượng</span>
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
export default UpdateBookControl