import { Router } from "express";
import * as authServices from './auth.services.js'
const router = Router();


router.post("/addUser", authServices.addUser); // admin only
// router.post("/login", login);





export default router;