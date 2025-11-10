import express from "express"
import cors from "cors"
import routTrainees from "./routs/routTrainees.js"
import routTrainings from "./routs/routTrainings.js"
import routTrainers from "./routs/routTrainers.js"
const port = 3000

const app = express()
app.use(cors())
app.use(express.json());

app.use("/trainees", routTrainees);

app.use("/trainings", routTrainings);

app.use("/trainers", routTrainers);


app.listen(port, () => {
    console.log(`Server is running on port:${port}`);
});
