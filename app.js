import express from "express";
import path from "path";
import cors from "cors";
import { fileURLToPath } from "url";
import routTrainees from "./routs/routTrainees.js";
import routTrainings from "./routs/routTrainings.js";
import routTrainers from "./routs/routTrainers.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const port = 3000;

const app = express();
app.use(cors());
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "public/images")));

app.use("/trainees", routTrainees);

app.use("/trainings", routTrainings);

app.use("/trainers", routTrainers);

app.listen(port, () => {
  console.log(`Server is running on port:${port}`);
});
``