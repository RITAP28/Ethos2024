import express from "express";
import { fetchUser, loginUser, registerUser } from "../controllers/user.controller.js";
import { isAuthenticatedUser } from "../middleware/auth.js";

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/me").get(isAuthenticatedUser, fetchUser);

export default router;