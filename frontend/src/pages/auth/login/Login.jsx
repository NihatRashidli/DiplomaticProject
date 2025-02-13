import React from "react";
import axios from "axios";
import { useFormik } from "formik";
import { loginschema } from "../../../schema/LoginSchema";
import { useDispatch } from "react-redux";
import { setUser } from "../../../redux/features/UserSlice";
import { Link, useNavigate } from "react-router-dom";

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
