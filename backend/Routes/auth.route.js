import { Router } from "express";
import {
  fetchUserDetails,
  login,
  signup,
} from "../Controllers/auth.controller.js";
const router = Router();

import { verifyJWT } from "../Middleware/Auth.js";
import { loginValidation, signupValidation } from "../Middleware/Validation.js";

router.post("/signup", signupValidation, signup);
router.post("/login", loginValidation, login);

router.get("/userDetails/:userId", verifyJWT, fetchUserDetails);

export default router;
