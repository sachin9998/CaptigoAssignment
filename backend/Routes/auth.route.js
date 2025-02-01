import { Router } from "express";
import { login, signup } from "../Controllers/auth.controller.js";
const router = Router();

import { loginValidation, signupValidation } from "../Middleware/Validation.js";

router.post("/signup", signupValidation, signup);
router.post("/login", loginValidation, login);

export default router;
