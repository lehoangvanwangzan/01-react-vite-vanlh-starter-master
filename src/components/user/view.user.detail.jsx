import { Button, Drawer, message, notification } from "antd"
import { useState } from "react";
import { handleUploadFile, UpdateUserAvatarAPI } from "../../services/api.service";
const ViewUserDetail = (props) => {
    const { dataDetail, setDataDetail, isDetailOpen, setIsDetailOpen, loadUser } = props;
    const [selectedFile, setSelectedFile] = useState(null)
    const [preview, setPreview] = useState(null)
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
    const HandleUpdateUserAvatar = async () => {
        //step1: upload file
        const resUpload = await handleUploadFile(selectedFile, "avatar")
        if (resUpload.data) {
            //success
            const newAvatar = resUpload.data.fileUploaded;
            //step2: update user
            const resUploadAvatar = await UpdateUserAvatarAPI(newAvatar, dataDetail._id, dataDetail.fullName, dataDetail.phone)
            if (resUploadAvatar.data) {
                setIsDetailOpen(false);
                setSelectedFile(null);
                setPreview(null);
                await loadUser();
                notification.success({
                    message: "Update user avatar",
                    description: "Cập nhật avatar thành công"
                })
            } else {
                notification.error({
                    message: "Error update avatar",
                    description: JSON.stringify(resUploadAvatar, message)
                })

            }
        } else {
            notification.error({
                message: "Error upload file",
                description: JSON.stringify(resUpload, message)
            })
        }
    }

    return (
        <>
            <Drawer
                width={"40vw"}
                title="Detail user"
                onClose={() => {
                    setDataDetail(null)
                    setIsDetailOpen(false);
                }}
                open={isDetailOpen}
            >
                {dataDetail ?
                    <>
                        <p>IP:{dataDetail._id}</p>
                        <br />
                        <p>Full name:{dataDetail.fullName}</p>
                        <br />
                        <p>Email:{dataDetail.email}</p>
                        <br />
                        <p>Phone number:{dataDetail.phone}</p>
                        <br />
                        <p>Avatar:</p>
                        <div>
                            <img height={250} width={300}
                                src={`${import.meta.env.VITE_URL_BACKEND}/images/avatar/${dataDetail.avatar}`}
                            ></img>
                        </div>

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
                                Upload Avatar
                            </label>
                            <input type='file' hidden id='btnUpload' onChange={(event) => { HandleOnChangeFile(event) }} />
                        </div>
                        {preview &&
                            <>
                                <div style={{
                                    marginTop: "10px",
                                    height: "100px", width: "150px",
                                    border: "1px solid #ccc"
                                }}>
                                    <img height={250} width={300}
                                        src={preview}
                                    ></img>
                                </div>
                                <Button type='primary'
                                    onClick={() => { HandleUpdateUserAvatar() }}> Save
                                </Button>
                            </>
                        }
                    </>
                    :
                    <>
                        <p>Không có dữ liệu</p>
                    </>
                }
            </Drawer >
        </>)
}
export default ViewUserDetail;