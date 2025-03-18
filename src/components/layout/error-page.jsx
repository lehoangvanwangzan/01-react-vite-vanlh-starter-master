import { useRouteError, NavLink } from "react-router-dom";
import { Button, Result } from 'antd';
import './error-page.css';

const ErrorPage = () => {
    const error = useRouteError();
    console.error(error);

    return (
        <Result
            status="404"
            title="Oops!"
            subTitle={error.statusText || error.message}
            extra={
                <Button type="primary">
                    <NavLink to="/">Go Back to Home </NavLink>
                </Button>}
        />
    );
}

export default ErrorPage;