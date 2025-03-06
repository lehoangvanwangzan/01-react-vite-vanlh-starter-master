import './header.css';
import { Link } from 'react-router-dom';
const Header = () => {
    return (
        <ul>
            <li><Link class="active" href="/">Home</Link></li>
            <li><Link to="/users">User</Link></li>
            <li><Link to="/products">Product</Link></li>
            <li><Link to="/login">Login</Link></li>
        </ul>
    );
}
export default Header;