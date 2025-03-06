import './header.css';
import { Link, NavLink } from 'react-router-dom';
const Header = () => {
    return (
        <ul>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/users">User</NavLink></li>
            <li><NavLink to="/books">Book</NavLink></li>
            <li><NavLink to="/login">Login</NavLink></li>
        </ul>
    );
}
export default Header;