import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import Employees from "../models/User.js";

export const getUsers = async (req, res) => {
  try {
    const usersList = await Employees.find();
    res.status(200).json(usersList);
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
};

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

export const Signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userSignIn = await Employees.findOne({ email });
    if (!userSignIn) return res.status(404).json({ message: "User not found" });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      userSignIn.password
    );
    if (!isPasswordCorrect)
      return res.status(404).json({ message: "Invalid Credentials" });

    const token = jwt.sign(
      { email: userSignIn.email, id: userSignIn._id },
      "test",
      { expiresIn: "2h" }
    );
    res.status(200).json({ result: userSignIn, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
