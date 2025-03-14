import joi from "joi";
import { Types } from "mongoose";
import { roles } from "../DB/models/user.model.js";
const isValidObjectId = (value, helpers) => {
  const isValid = Types.ObjectId.isValid(value);
  if (isValid) return true;
  return helpers.message("Invalid id from validation");
};

export const generalValidation = {
  userName: joi.string().min(3).max(15),
  email: joi.string().email({
    tlds: { allow: ["dev"] },
    maxDomainSegments: 2,
    minDomainSegments: 1,
  }),
  // password: joi.string().min(8).max(15),
  password: joi.string(),
  confirmPassword: joi.string().valid(joi.ref("password")),
  phone: joi.string(),
  code: joi.string().length(6),
  id: joi.custom(isValidObjectId),
  role: joi.string().valid(...Object.values(roles)),
  address: joi.string(),
  quantity: joi.number(),
};
export const noDataValidation = joi.object({}).required();

export const validation = (schema) => {
  return (req, res, next) => {
    const data = { ...req.body, ...req.query, ...req.params };
    const result = schema.validate(data, { abortEarly: false });
    if (result.error) {
      const errors = result.error.details.map((error) => {
        return error.message;
      });
      return res.status(400).json({ validationError: errors });
    }
    return next();
  };
};
