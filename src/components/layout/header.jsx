// import './header.css';
import { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { UserOutlined, HomeOutlined, BookOutlined, LogoutOutlined, LoginOutlined, AliwangwangOutlined } from '@ant-design/icons';
import { Menu, message } from "antd";
import { AuthContext } from '../context/auth.context';
import { logoutAPI } from '../../services/api.service';

const Header = () => {
    const [current, setCurrent] = useState('');
    const navigate = useNavigate();
    const { user, setUser } = useContext(AuthContext);
    const onClick = (e) => {

        setCurrent(e.key);
    };
    const handleLogout = async () => {
        const res = await logoutAPI();
        if (res.data) {
            //clear data
            localStorage.removeItem("access_token");
            setUser({
                email: "",
                phone: "",
                fullName: "",
                role: "",
                avatar: "",
                id: ""
            });
            message.success("Logout thành công")
            //redirect to home
            navigate("/")
        }
    }
    const items = [
        {
            label: <NavLink to="/">Home</NavLink>,
            key: 'home',
            icon: <HomeOutlined />,
        },
        {
            label: <NavLink to="/user">User</NavLink>,
            key: 'users',
            icon: <UserOutlined />,
            // disabled: true,
        },
        {
            label: <NavLink to="/books">Book</NavLink>,
            key: 'book',
            icon: <BookOutlined />,
            // disabled: true,
        },
        ...(!user.id ? [{
            label: <NavLink to={"/login"}>Đăng nhập</NavLink>,
            key: 'login',
            icon: <LoginOutlined />,
        }] : []),
        ...(user.id ? [{
            label: `Welcome ${user.fullName}`,
            key: 'setting',
            icon: <AliwangwangOutlined />,
            children: [
                {
                    type: 'group',
                    // label: 'Item 1',
                    children: [
                        {
                            label: <NavLink to="/" onClick={() => {
                                handleLogout();
                            }}>Đăng xuất</NavLink>,
                            key: 'logout',
                            icon: <LogoutOutlined />,
                        },
                    ],
                }
            ],
        }] : []),

    ];
    return (
        <Menu
            onClick={onClick}
            selectedKeys={[current]}
            mode="horizontal"
            items={items} />
        // <ul>
        //     <li><NavLink to="/">Home</NavLink></li>
        //     <li><NavLink to="/user">User</NavLink></li>
        //     <li><NavLink to="/books">Book</NavLink></li>
        //     <li><NavLink to="/login">Login</NavLink></li>
        // </ul>
    );
}
export default Header;