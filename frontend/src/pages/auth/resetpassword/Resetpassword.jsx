import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { resetschema } from "../../../schema/ResetSchema";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Resetpassword.scss";

const Resetpassword = () => {
  const baseUrl = `http://localhost:5000/auth`;
  const navigate = useNavigate();
  const [token, setToken] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tokenFromUrl = urlParams.get("token");
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
    } else {
      alert("Token not found!");
    }
  }, []);

  const submitForm = async (values, actions) => {
    try {
      const { password } = values;

      const result = await axios.post(
        `${baseUrl}/resetpassword`,
        { password, token },
        { withCredentials: true }
      );
      if (result.status === 200) {
        alert("Password reset successfully");
        navigate("/login");
      } else {
        alert("Password reset failed");
      }
      actions.resetForm();
    } catch (error) {
      console.error("Password reset failed:", error);
      alert(
        `Error: ${error.response ? error.response.data.message : error.message}`
      );
    }
  };

  const { values, handleChange, handleSubmit, errors } = useFormik({
    initialValues: {
      password: "",
      confirmpassword: "",
    },
    onSubmit: submitForm,
    validationSchema: resetschema,
  });

  return (
    <div className="container-resetpassword">
      <form
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <h3>Reset Password</h3>

        <div className="form-group">
          <label htmlFor="password">New password</label>
          <div className="text-danger">{errors.password}</div>
          <input
            placeholder="Enter your new password"
            type="password"
            id="password"
            name="password"
            className="form-control"
            onChange={handleChange}
            value={values.password}
          />
        </div>

        <div className="form-group">
          <label htmlFor="confirmpassword">Confirm new password</label>
          <div className="text-danger">{errors.confirmpassword}</div>
          <input
            placeholder="Enter your new password again"
            type="password"
            id="confirmpassword"
            name="confirmpassword"
            className="form-control"
            onChange={handleChange}
            value={values.confirmpassword}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Reset
        </button>
      </form>
    </div>
  );
};

export default Resetpassword;
