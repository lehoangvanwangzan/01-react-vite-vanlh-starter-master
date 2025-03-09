import { useEffect, useState } from "react"
import { Input, notification, Modal } from "antd";
import { updateUserAPI } from "../../services/api.service";
const UpdateUserModal = (props) => {
    const [fullName, setFullName] = useState("");
    const [id, setId] = useState("");
    const [phone, setPhone] = useState("");
    const { isModalUpdateOpen, setIsModalUpdateOpen, dataUpdate, setDataUpdate, loadUser } = props;
    // const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(true);
    useEffect(() => {
        console.log(">>> run check props:", dataUpdate)
        if (dataUpdate) {
            setId(dataUpdate._id);
            setFullName(dataUpdate.fullName);
            setPhone(dataUpdate.phone);
            setDataUpdate(null);
        }
    }, [dataUpdate]);
    const HandleSubmitdButton = async () => {
        const res = await updateUserAPI(id, fullName, phone);
        if (res.data) {
            notification.success({
                message: "Update User Success",
                description: "Cập nhật user thành công",
            }

            );
        } else {
            notification.error({
                message: "Update User Fail",
                description: JSON.stringify(res.message),
            });
        }
        ResetAndCloseModal();
        await loadUser();
    }
    const ResetAndCloseModal = () => {
        setIsModalUpdateOpen(false);
        setFullName("");
        setId("");
        setPhone("");
    }
    // console.log(">>> run check props:", dataUpdate)
    return (
        <Modal title="Update User"
            open={isModalUpdateOpen}
            onOk={() => { HandleSubmitdButton() }}
            onCancel={() => { ResetAndCloseModal() }}
            maskClosable={false}
            okText={"SAVE"}
        >
            <div style={{ display: "flex", gap: "15px", flexDirection: "column" }} >
                <div>
                    <span> ID</span>
                    <Input
                        value={id}
                        disabled
                    // onChange={(event) => { setId(event.target.value); }}

                    />
                </div>
                <div>
                    <span> Full Name</span>
                    <Input
                        value={fullName}
                        onChange={(event) => { setFullName(event.target.value); }}
                    />
                </div>
                <div>
                    <span> Phone Number</span>
                    <Input
                        value={phone}
                        onChange={(event) => { setPhone(event.target.value); }}
                    />
                </div>
            </div>
        </Modal>
    )

}
export default UpdateUserModal;
