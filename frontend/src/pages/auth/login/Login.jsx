// import React, { useState } from "react";
// import axios from "axios";
// import { useDispatch } from "react-redux";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { setUser } from "../../../redux/features/userSlice";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const dispatch = useDispatch();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post("http://localhost:5000/auth/login", {
//         email,
//         password,
//       });

//       console.log(res);

//       if (res.status === 200) {
//         localStorage.setItem("token", res.data.user.token);
//         console.log("Token saved:", res.data.user.token);
//         dispatch(setUser(res.data.user));
//         toast.success("Login successful");
//       } else {
//         toast.error("Login failed");
//       }
//     } catch (error) {
//       toast.error("Login failed");
//     }
//   };

//   return (
//     <form onSubmit={handleLogin}>
//       <input
//         type="email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         placeholder="Email"
//       />
//       <input
//         type="password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         placeholder="Password"
//       />
//       <button type="submit">Login</button>
//     </form>
//   );
// };

// export default Login;


import React from "react";
import axios from "axios";
import { useFormik } from "formik";
import { loginschema } from "../../../schema/LoginSchema";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setUser } from "../../../redux/features/userSlice";

const Login = () => {
  const baseUrl = "http://localhost:5000/auth";
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitForm = async (values, actions) => {
    try {
      const res = await axios.post(`${baseUrl}/login`, values, {
        withCredentials: true,
      });

      if (res.status === 200) {
        dispatch(setUser(res.data));
        alert("Login successful");
        navigate("/");
      } else {
        alert("Login failed");
      }

      actions.resetForm();
    } catch (error) {
      console.error("Login failed:", error);
      alert(
        `Error: ${error.response ? error.response.data.message : error.message}`
      );
    }
  };

  const { values, handleChange, handleSubmit, errors } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: submitForm,
    validationSchema: loginschema,
  });

  return (
    <div className="container">
      <form
        encType="multipart/form-data"
        action=""
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <h3>Login</h3>

        <div className="form-group">
          <label htmlFor="email">E-mail</label>
          <div className="text-danger">{errors.email}</div>
          <input
            type="text"
            id="email"
            name="email"
            className="form-control"
            onChange={handleChange}
            value={values.email}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <div className="text-danger">{errors.password}</div>
          <input
            type="password"
            id="password"
            name="password"
            className="form-control"
            onChange={handleChange}
            value={values.password}
          />
        </div>
        <span>
          <Link to="/forgotpassword">Forgot password?</Link>
        </span>

        <button type="submit" className="btn btn-primary">
          Sign-In
        </button>

        <span>
          Don't have an account? <Link to="/register">register</Link>
        </span>
      </form>
    </div>
  );
};

export default Login;