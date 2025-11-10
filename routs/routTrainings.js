import express from "express"
import { insertTraining,deleteTraining,readById} from "../serviceTrainings.js"
const routTrainings = express.Router()

routTrainings.get("/readById/:id", (req, res) => {
    try {
        const id = req.params.id
        const trainings = readById(id); 
        res.status(200).json(trainings);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "ettor" });
    }
})

routTrainings.post("/insert",(req, res)=>{
    try{
        const result = insertTraining(req.body)
        if(!result.ok){
            return res.status(400).json({message:result.message})
        }
        res.status(200).json(result);
    }catch(error){
        console.error(error);
        res.status(500).json({ message: "ettor" }); 
    }
})

routTrainings.delete("/delete/:trainingId/:userId",(req, res)=>{
    try{
        const {trainingId,userId} = req.params
        const trainings = deleteTraining(trainingId,userId)
        res.status(200).json(trainings);
    }catch(error){
        console.error(error);
        res.status(500).json({ message: "ettor" }); 
    }
})

export default routTrainings