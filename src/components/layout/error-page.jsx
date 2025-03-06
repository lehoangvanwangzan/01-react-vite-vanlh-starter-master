import { useRouteError, NavLink } from "react-router-dom";
import './error-page.css';

const ErrorPage = () => {
    const error = useRouteError();
    console.error(error);

    return (
        <>
            <title>Error Page</title>
            <div className="error-container">
                <h1 className="error-code">404</h1>
                <p className="error-message">Page Not Found</p>
                <p className="error-description">Oops! The page you're looking for doesn't exist or has been moved.</p>
                <NavLink to="/" className="btn">Go Back to Home</NavLink>
            </div>
        </>
    );
}

export default ErrorPage;