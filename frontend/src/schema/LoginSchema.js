import * as yup from "yup";

export const loginschema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter valid email address")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});
