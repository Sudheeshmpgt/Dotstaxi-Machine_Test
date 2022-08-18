const joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

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
    password: new passwordComplexity({
      min: 8,
      max: 25,
      lowerCase: 1,
      upperCase: 1,
      numeric: 1,
    })
      .required()
      .label("Password"),
  });
  return schema.validate(data);
};

const loginValidation = (data) => {
  const schema = joi.object({
    email: joi.string().email().required().label("Email"),
    password: joi.allow(),
  });
  return schema.validate(data);
};

const refreshTokenValidation = (data) => {
  const schema = joi.object({
    refreshToken: joi.string().required().label("Refresh Token"),
  });
  return schema.validate(data);
};

const vehicleValidation = (data) => {
  const schema = joi.object({
    vehicle_name: joi.string().required().label("Vehicle Name"),
    vehicle_number: joi.string().required().label("Vehicle Number"),
    vehicle_model: joi.string().required().label("Vehicle Model"),
    userId: joi.allow(),
  });
  return schema.validate(data);
};

module.exports = { validate, loginValidation, refreshTokenValidation, vehicleValidation };
