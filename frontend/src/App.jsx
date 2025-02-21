import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Admin from "./pages/admin/Admin";
import Register from "./pages/auth/register/Register";
import Login from "./pages/auth/login/Login";
import ForgotPassword from "./pages/auth/forgotpassword/ForgotPassword";
import Resetpassword from "./pages/auth/resetpassword/Resetpassword";
import Verify from "./pages/auth/verify/Verify";
import ProfilePage from "./pages/profile/ProfilePage";
import DocumentStorage from "./pages/document/DocumentStorage";
import Tax from "./pages/Tax";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/tax",
        element: <Tax />,
      },
      {
        path: "/admin",
        element: <Admin />,
      },
      {
        path: "/profile",
        element: <ProfilePage />,
      },
      {
        path: "/documentstorage",
        element: <DocumentStorage />,
      },
    ],
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/forgotpassword",
    element: <ForgotPassword />,
  },
  {
    path: "/resetpassword",
    element: <Resetpassword />,
  },
  {
    path: "/verify",
    element: <Verify />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
