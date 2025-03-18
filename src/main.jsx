import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import LoginPage from './pages/login.jsx'
import RegisterPage from './pages/register.jsx'
import UserPage from './pages/user.jsx'
import BookPage from './pages/books.jsx'
import ErrorPage from './components/layout/error-page.jsx'
import TodoAPP from './components/todo/TodoApp.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { AuthWrapper } from './components/context/auth.context.jsx'
import PrivateRoute from './pages/private.route.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <TodoAPP />
      },
      {
        path: "/user",
        element: (
          <PrivateRoute>
            <UserPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/books",
        element: (
          <PrivateRoute>
            <BookPage />
          </PrivateRoute>
        ),
      }
    ],

  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },

]);

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <AuthWrapper>
    <RouterProvider router={router} />
  </AuthWrapper>
  /* </React.StrictMode> */
)
