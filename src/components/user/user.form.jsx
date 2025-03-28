import { Input, Button, notification, Modal } from "antd";
import { useState } from "react";
import { createUserAPI } from "../../services/api.service";

const UserForm = (props) => {
    const { loadUser } = props;
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const HandleSubmitdButton = async () => {
        const res = await createUserAPI(fullName, email, password, phone);
        if (res.data) {
            notification.success({
                message: "Create User Success",
                description: "Tạo mới user thành công",
            }

            );
        } else {
            notification.error({
                message: "Create User Fail",
                description: JSON.stringify(res.message),
            });
        }
        ResetAndCloseModal();
        await loadUser();
    }
    const ResetAndCloseModal = () => {
        setIsModalOpen(false);
        setFullName("");
        setEmail("");
        setPassword("");
        setPhone("");
    }
    return (
        <div className="user-form" style={{ padding: "10px 0" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h3>Table User</h3>
                <Button type="primary" onClick={() => { setIsModalOpen(true) }}>Create User</Button>
            </div>
            <Modal title="Create User"
                open={isModalOpen}
                onOk={() => { HandleSubmitdButton() }}
                onCancel={() => { ResetAndCloseModal() }}
                maskClosable={false}
                okText={"CREATE"}
            >
                <div style={{ display: "flex", gap: "15px", flexDirection: "column" }} >
                    <div>
                        <span> Full Name</span>
                        <Input
                            value={fullName}
                            onChange={(event) => { setFullName(event.target.value); }}
                        />
                    </div>
                    <div>
                        <span> Email</span>
                        <Input
                            value={email}
                            onChange={(event) => { setEmail(event.target.value); }}
                        />
                    </div>
                    <div>
                        <span> Password</span>
                        <Input.Password
                            value={password}
                            onChange={(event) => { setPassword(event.target.value); }}
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
        </div>
    )
}
export default UserForm;