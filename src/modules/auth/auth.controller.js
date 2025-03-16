import { Router } from "express";
import * as authServices from './auth.services.js'
import { validation } from "../../middleware/validation.middleware.js";
import * as authValidation from "./auth.validation.js";
import { allowTo, auth, isPasswordChanged } from "../../middleware/auth.middleware.js";
import AsyncHandler from "express-async-handler";
import { roles } from "../../DB/models/user.model.js";
const router = Router();


router.post(
    "/add-user",
    validation(authValidation.addUserValidation),
    auth(),
    isPasswordChanged(),
    allowTo(roles.ADMIN),
    AsyncHandler(authServices.addUser)
); // admin only
    
router.post(
    "/login",
    validation(authValidation.loginValidation),
    AsyncHandler(authServices.login)
); // public


router.patch(
    "/change-password",
    validation(authValidation.changePasswordValidation),
    auth(),
    allowTo(roles.USER),
    AsyncHandler(authServices.changePassword)
); // user only

export default router;