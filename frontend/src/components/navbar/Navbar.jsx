import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navbar.scss";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setUser } from "../../redux/features/userSlice";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const baseUrl = "http://localhost:5000/auth";

  const { user } = useSelector((state) => state.user);
  const isAdmin = user?.role === "admin";
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${baseUrl}/user`, {
          withCredentials: true,
        });

        if (res.status === 200) {
          dispatch(setUser(res.data));
        }
      } catch (error) {
        console.log(error);
      }
    };

    const cookies = document.cookie;
    if (cookies.includes("token=")) {
      fetchUser();
    }
  }, [dispatch]);

  const handleLogout = async () => {
    try {
      const res = await axios.post(
        `${baseUrl}/logout`,
        {},
        {
          withCredentials: true,
        }
      );

      if (res.status === 200) {
        dispatch(setUser(null));
        toast.success("Logout successful");
      } else {
        toast.error("Logout failed");
      }
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  return (
    <div className="navbar-section">
      <ToastContainer />
      <div className="container">
        <div className="navbar">
          <div className="logo">DataSnipper</div>
          <ul className="navlist">
            <li className="navlist-item">
              <Link to="/">Home</Link>
            </li>
            <li className="navlist-item">
              <Link to="/tax">Tax Calculate</Link>
            </li>
            <li className="navlist-item">
              <Link to="/documentstorage">Document Storage</Link>
            </li>
            {isAdmin && <Link to="/admin">Admin Panel</Link>}
          </ul>
          <div className="wrapper">
            <Link to="/profile">
              <FaUserCircle size={24} style={{ cursor: "pointer" }} />
            </Link>
            <div className="dropdown">
              <button
                className="btn btn-light dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
              >
                <i className="fa-solid fa-user"></i>
                {user && user.isVerified ? (
                  <span>
                    {user.name} {user.surname}
                  </span>
                ) : (
                  "Daxil ol"
                )}
              </button>
              <ul className="dropdown-menu">
                {user ? (
                  <li onClick={handleLogout}>
                    <Link className="dropdown-item logout" to="/">
                      Logout
                    </Link>
                  </li>
                ) : (
                  <>
                    <li>
                      <Link className="dropdown-item register" to="/register">
                        Register
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item login" to="/login">
                        Login
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
