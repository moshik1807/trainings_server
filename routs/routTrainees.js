import express from "express";
import { readTrainees, insertTrainees, login } from "../serviseTrainees.js";

const routTrainees = express.Router();

routTrainees.get("/readAll", (req, res) => {
  try {
    const trainees = readTrainees();
    res.status(200).json(trainees);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "error" });
  }
});

routTrainees.post("/login", (req, res) => {
  try {
    const user = login(req.body); 
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(401).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "error" });
  }
});

routTrainees.post("/signup", (req, res) => {
  try {
    const user = insertTrainees(req.body);
    if(!user){
      res.status(409).json({ message: "User already exists" });
    }
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "error" });
  }
});

export default routTrainees;





