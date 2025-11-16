import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { createToken, TokenDecoding } from "./authService.js";
import { writeToJsonFile } from "./controler.js";
import { readFromJsonFile } from "./controler.js";

export async function insertTrainees(Trainees) {
  const data = readFromJsonFile("./db/trainees.json");
  const check = data.find((e) => e.name === Trainees.name);
  if (check) {
    const isMatch = await bcrypt.compare(Trainees.password, check.password);
    if (isMatch) {
      return false;
    }
  }
  Trainees.id = data.length ? data[data.length - 1].id + 1 : 1;
  Trainees.profileImage = "/image.png";
  Trainees.password = await bcrypt.hash(Trainees.password, 10);
  data.push(Trainees);
  writeToJsonFile("./db/trainees.json", data);
  return createToken(Trainees);
}

export async function login(Trainees) {
  const trainees = readFromJsonFile("./db/trainees.json");
  const newTrainees = trainees.find((t) => t.name === Trainees.name);
  if (newTrainees) {
    const isMatch = await bcrypt.compare(
      Trainees.password,
      newTrainees.password
    );
    if (isMatch) {
      return createToken(newTrainees);
    }
  } else {
    return null;
  }
}

export function getUserById(id) {
    const data = readFromJsonFile("./db/trainees.json");
    const Traine =  data.find(t => t.id === id)
    return Traine;
}
