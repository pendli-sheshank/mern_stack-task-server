import express, { Router } from "express";
import { Register, getUsers, Signin } from "../controllers/user.js";

const router = express.Router();
router.post("/register", Register);
router.post("/signin", Signin);
router.get("/", getUsers);

export default router;
