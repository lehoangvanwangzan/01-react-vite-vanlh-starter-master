import { Input, Button, notification } from "antd";
import { useState } from "react";
import axios from "axios";//import axios
import create from "@ant-design/icons/lib/components/IconFont";
import { createUserAPI } from "../../services/api.service";

const UserForm = () => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    // console.log(fullName, email, password, phone);
    const HandleClickedButton = async () => {
        const res = await createUserAPI(fullName, email, password, phone);

        // console.log("check res:", res);
        if (res.data) {
            notification.success({
                message: "Create User Success",
                description: "Tạo mới user thành công",
            });
        } else {
            notification.error({
                message: "Create User Fail",
                description: JSON.stringify(res.message),
            });
        }

    }
    return (
        <div className="user-form" style={{ padding: "20px 0" }}>
            <div style={{ display: "flex", gap: "10px", flexDirection: "column" }} >
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
                <div>
                    <Button type="primary"
                        onClick={HandleClickedButton}
                    >Add User</Button>
                </div>
            </div>

        </div>
    )
}
export default UserForm;