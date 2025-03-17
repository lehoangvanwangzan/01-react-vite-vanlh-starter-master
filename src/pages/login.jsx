import { Input, Button, Form, notification, Row, Col, Divider } from "antd";
import { useNavigate, NavLink } from "react-router-dom";
import { loginPageUserAPI } from "../services/api.service";
import { ArrowRightOutlined } from "@ant-design/icons";
const LoginPage = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const onFinish = async (values) => {
        console.log(values)
        //call API
        const res = await loginPageUserAPI(
            values.email,
            values.password
        );
        if (res.data) {
            notification.success({
                message: "Login Success",
                description: "Đăng nhập thành công",
            }

            );
            navigate("/") //sau khi đăng nhập thành công, chuyển qua trang home
        } else {
            notification.error({
                message: "Login Fail",
                description: JSON.stringify(res.message),
            });
        }
    }
    return (
        <Row justify={"center"} style={{ marginTop: "20px" }}>
            <Col xs={24} md={16} lg={8}>
                <fieldset style={{
                    padding: "15px",
                    margin: "5px",
                    border: "1px solid #ccc",
                    borderRadius: "5px"

                }}>
                    <legend>Đăng nhập</legend>
                    <Form
                        form={form}
                        layout="vertical"
                        name="basic"
                        onFinish={onFinish}
                        style={{
                            margin: "50px"
                        }}
                    >

                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your email!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>


                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item label={null}>
                            <div style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center"
                            }}>
                                <Button type="primary" onClick={() => { form.submit() }}>
                                    Login
                                </Button>
                                <NavLink to="/" >Go to homepage <ArrowRightOutlined /></NavLink>
                            </div>
                        </Form.Item>
                    </Form>
                    <Divider />
                    <div style={{ textAlign: "center" }}> Chưa có tài khoản? <NavLink to="/register">Đăng ký tại đây</NavLink> </div>
                </fieldset>
            </Col>
        </Row>
    );
};
export default LoginPage;