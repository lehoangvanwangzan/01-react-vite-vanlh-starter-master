// import './header.css';
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { UserOutlined, HomeOutlined, SettingOutlined, BookOutlined, LogoutOutlined, LoginOutlined } from '@ant-design/icons';
import { Menu } from "antd";

const Header = () => {
    const [current, setCurrent] = useState('');
    const onClick = (e) => {
        // console.log('click ', e);
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
        {
            label: 'Cài đặt',
            key: 'setting',
            icon: <SettingOutlined />,
            children: [
                {
                    type: 'group',
                    // label: 'Item 1',
                    children: [
                        {
                            label: <NavLink to="/login">Đăng nhập</NavLink>,
                            key: 'login',
                            icon: <LoginOutlined />,
                        },
                        {
                            label: <NavLink to="/register">Đăng xuất</NavLink>,
                            key: 'logout',
                            icon: <LogoutOutlined />,
                        },
                    ],
                }
            ],
        },

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