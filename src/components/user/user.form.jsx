import { Input, Button } from "antd";
import { useState } from "react";
import axios from "axios";//import axios
const UserForm = () => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    // console.log(fullName, email, password, phone);
    const HandleClickedButton = () => {
        const URL_BACKEND = "http://localhost:8080/api/v1/user";
        const data = {
            fullName: fullName,
            email: email,
            password: password,
            phone: phone
        }
        axios.post(URL_BACKEND, data)
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            })
        // console.log({ fullName, email, password, phone });
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