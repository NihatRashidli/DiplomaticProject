import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.scss";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setUser } from "../../redux/features/userSlice";
import { FaUserCircle, FaBars } from "react-icons/fa";

const Navbar = () => {
  const baseUrl = "http://localhost:5000/auth";
  const { user } = useSelector((state) => state.user);
  const isAdmin = user?.role === "admin";
  const dispatch = useDispatch();
  const [menuOpen, setMenuOpen] = useState(false);

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

          <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
            <FaBars />
          </div>

          <ul className={`navlist ${menuOpen ? "open" : ""}`}>
            {user && (
              <li className="user-info">
                <FaUserCircle size={20} /> {user.name} {user.surname}
              </li>
            )}

            <li className="navlist-item">
              <Link to="/" onClick={() => setMenuOpen(false)}>
                Home
              </Link>
            </li>
            <li className="navlist-item">
              <Link to="/tax" onClick={() => setMenuOpen(false)}>
                Tax Calculate
              </Link>
            </li>
            <li className="navlist-item">
              <Link to="/documentstorage" onClick={() => setMenuOpen(false)}>
                Document Storage
              </Link>
            </li>
            {isAdmin && (
              <li className="navlist-item">
                <Link to="/admin" onClick={() => setMenuOpen(false)}>
                  Admin Panel
                </Link>
              </li>
            )}

            {/* 🔹 Profil və Auth düymələri */}
            {user ? (
              <>
                <li className="navlist-item">
                  <Link to="/profile" onClick={() => setMenuOpen(false)}>
                    Profile
                  </Link>
                </li>
                <li className="navlist-item" onClick={handleLogout}>
                  <Link to="/" onClick={() => setMenuOpen(false)}>
                    Logout
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="navlist-item">
                  <Link to="/register" onClick={() => setMenuOpen(false)}>
                    Register
                  </Link>
                </li>
                <li className="navlist-item">
                  <Link to="/login" onClick={() => setMenuOpen(false)}>
                    Login
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
