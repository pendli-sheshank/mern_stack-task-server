import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import Employees from "../models/User.js";

export const Register = async (req, res) => {
  const { name, email, password, mobile } = req.body;
  try {
    const existingUser = await Employees.findOne({ email });
    if (existingUser) {
      res.status(400).send("User already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await Employees.create({
      email,
      name,
      password: hashedPassword,
      mobile,
    });
    const token = jwt.sign({ email: result.email.id, id: result._id }, "test", {
      expiresIn: "2h",
    });

    res.status(200).json({ ...result, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
