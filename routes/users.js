import express, { Router } from "express";
import { Register } from "../controllers/user.js";

const router = express.Router();
router.post("/register", Register);

export default router;
