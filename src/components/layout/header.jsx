// import './header.css';
import { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { UserOutlined, HomeOutlined, BookOutlined, LogoutOutlined, LoginOutlined, AliwangwangOutlined } from '@ant-design/icons';
import { Menu } from "antd";
import { AuthContext } from '../context/auth.context';

const Header = () => {
    const [current, setCurrent] = useState('');
    const { user } = useContext(AuthContext);
    const onClick = (e) => {

        setCurrent(e.key);
    };
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
                            label: <NavLink to="/login" onClick={() => {
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