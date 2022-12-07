import express from "express";
import { loginUser, registerUser } from "../Controllers/AuthController.js"; // important de mettre le js
const router = express.Router();

// authUser
router.post("/register", registerUser); //'/api/auth/signup'
router.post("/login", loginUser);

export default router;
