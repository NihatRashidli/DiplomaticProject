import React from "react";
import axios from "axios";
import { useFormik } from "formik";
import { registerschema } from "../../../schema/RegisterSchema";
import "./Register.scss";

const Register = () => {
  const baseUrl = "http://localhost:5000/auth";

  const submitForm = async (values, actions) => {
    try {
      const formData = new FormData();
      formData.append("image", values.image);
      formData.append("name", values.name);
      formData.append("surname", values.surname);
      formData.append("email", values.email);
      formData.append("password", values.password);

      await axios.post(`${baseUrl}/register`, formData, {
        withCredentials: true,
      });

      actions.resetForm();

      alert("Please check your email to verify your account.");
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  const { values, handleChange, handleSubmit, setFieldValue, errors } =
    useFormik({
      initialValues: {
        image: "",
        name: "",
        surname: "",
        email: "",
        password: "",
        confirmpassword: "",
      },
      onSubmit: submitForm,
      validationSchema: registerschema,
    });

  return (
    <div className="register-container">
      <div className="register-info">
        <h2>Accelerate your Audit and Finance teams' productivity!</h2>
        <ul>
          <li>✅ Perform your audit and finance procedures 10x faster</li>
          <li>✅ Drive company growth and resilience</li>
          <li>✅ Reduce the amount of repetitive work</li>
        </ul>
        <p>Get your questions answered in a personalized demo.</p>
      </div>

      <div className="register-form-container">
        <form
          encType="multipart/form-data"
          className="register-form"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <h3>Register</h3>

          <div className="form-group">
            <label htmlFor="image">Profile Photo</label>
            <input
              type="file"
              id="image"
              className="form-control"
              onChange={(e) => setFieldValue("image", e.target.files[0])}
            />
          </div>

          <div className="form-group">
            <label htmlFor="name">Name</label>
            <div className="text-danger">{errors.name}</div>
            <input
              type="text"
              id="name"
              name="name"
              className="form-control"
              onChange={handleChange}
              value={values.name}
            />
          </div>

          <div className="form-group">
            <label htmlFor="surname">Surname</label>
            <div className="text-danger">{errors.surname}</div>
            <input
              type="text"
              id="surname"
              name="surname"
              className="form-control"
              onChange={handleChange}
              value={values.surname}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <div className="text-danger">{errors.email}</div>
            <input
              type="email"
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

          <div className="form-group">
            <label htmlFor="confirmpassword">Confirm Password</label>
            <div className="text-danger">{errors.confirmpassword}</div>
            <input
              type="password"
              id="confirmpassword"
              name="confirmpassword"
              className="form-control"
              onChange={handleChange}
              value={values.confirmpassword}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Sign-Up
          </button>

          <span>
            Already have an account? <a href="/login">Login</a>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Register;
