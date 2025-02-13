import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Category from "./pages/Category";
import Men from "./pages/Men";
import Women from "./pages/Women";
import Latest from "./pages/Latest";
import Admin from "./pages/admin/Admin";
import ProductDetail from "./pages/productdetail/ProductDetail";
import Register from "./pages/auth/register/Register";
import Login from "./pages/auth/login/Login";
import ForgotPassword from "./pages/auth/forgotpassword/ForgotPassword";
import Resetpassword from "./pages/auth/resetpassword/Resetpassword";

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
        path: "/category",
        element: <Category />,
      },
      {
        path: "/men",
        element: <Men />,
      },
      {
        path: "/women",
        element: <Women />,
      },
      {
        path: "/latest",
        element: <Latest />,
      },
      {
        path: "/admin",
        element: <Admin />,
      },
      {
        path: "/productdetail/:id",
        element: <ProductDetail />,
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
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
