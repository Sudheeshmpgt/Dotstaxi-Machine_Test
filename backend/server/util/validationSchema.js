const joi = require("joi");

const validate = (data) => {
  const schema = joi.object({
    name: joi
      .string()
      .min(3)
      .max(25)
      .pattern(/^[a-zA-Z][a-zA-Z][a-zA-Z ]*$/)
      .required()
      .label("Name"),
    email: joi.string().email().required().label("Email"),
    phone: joi
      .string()
      .length(10)
      .pattern(/^\d{10}$/)
      .required()
      .label("Phone"),
    password: joi.allow(),
  });
  return schema.validate(data);
};

const loginValidation = (data) => {
  const schema = joi.object({
    email: joi.string().email().required().label("Email"),
    password: joi.allow()
  });
  return schema.validate(data);
};

const refreshTokenValidation = (data) => {
  const schema = joi.object({
    refreshToken: joi.string().required().label("Refresh Token"),
  });
  return schema.validate(data);
}

module.exports = { validate, loginValidation, refreshTokenValidation };
