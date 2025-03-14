// { name, email, phone, address }

import joi from "joi";
import { generalValidation } from "../../middleware/validation.middleware.js";


export const addUserValidation = joi.object({
    name: generalValidation.userName.required(),
    email: generalValidation.email.required(),
    phone: generalValidation.phone.required(),
    address: generalValidation.address.required()
}).required();

export const loginValidation = joi.object({
    email: generalValidation.email.required(),
    password: joi.string().required()
}).required();

export const changePasswordValidation = joi.object({
    oldPassword: generalValidation.password.required(),
    newPassword: generalValidation.password.required(),
    confirmPassword: joi.string().valid(joi.ref("newPassword")).required(),

}).required();
