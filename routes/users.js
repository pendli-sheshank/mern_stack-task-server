import express, { Router } from "express";
import auth from "../auth/auth.js";
import { Register, getUsers, Signin } from "../controllers/user.js";

const router = express.Router();
router.post("/register", Register);
router.post("/signin", auth, Signin);
router.get("/", getUsers);

export default router;
