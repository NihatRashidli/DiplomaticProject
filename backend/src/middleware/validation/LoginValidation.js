import Joi from "joi";

const LoginValidationSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

export default LoginValidationSchema;
