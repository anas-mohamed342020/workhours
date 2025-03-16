import { Router } from "express";
import * as userServices from './user.services.js'
import { validation } from "../../middleware/validation.middleware.js";
import * as userValidation from "./user.validation.js";
import { auth } from "../../middleware/auth.middleware.js";
import AsyncHandler from "express-async-handler";
const router = Router();


router.get(
    "/get-profile",
    auth(),
    AsyncHandler(userServices.getProfile)
)

router.patch(
    "/update-profile",
    auth(),
    validation(userValidation.updateProfile),
    AsyncHandler(userServices.updateProfile)
)

export default router;