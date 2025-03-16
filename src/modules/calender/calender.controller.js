import { Router } from "express";
import * as calenderService from "./calender.service.js";
import { validation } from "../../middleware/validation.middleware.js";
import * as calenderValidation from "./calender.validation.js";
import { allowTo, auth } from "../../middleware/auth.middleware.js";
import AsyncHandler from "express-async-handler";
import { roles } from "../../DB/models/user.model.js";
const router = Router();

router.post(
  "/add-calender",
  validation(calenderValidation.addCalenderSchema),
  auth(),
  allowTo(roles.ADMIN, roles.USER),
  AsyncHandler(calenderService.addCalender)
);

export default router;
