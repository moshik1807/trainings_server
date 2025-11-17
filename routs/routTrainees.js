import express from "express";

import { auth } from "../authService.js";
import { insertTrainees, login, getUserById } from "../serviseTrainees.js";

const routTrainees = express.Router();

routTrainees.get("/readById", auth, (req, res) => {
  try {
    const id = req.user.id;
    const user = getUserById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "error" });
  }
});

routTrainees.post("/login", async (req, res) => {
  try {
    const user = await login(req.body);
    if (user) {
      return res.status(200).json(user);
    } else {
      res.status(401).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "error" });
  }
});

routTrainees.post("/signup", async (req, res) => {
  try {
    const user = await insertTrainees(req.body);
    if (!user) {
      return res.status(409).json({ message: "User already exists" });
    }
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "error" });
  }
});

export default routTrainees;