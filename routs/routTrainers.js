import express from "express"
import { readTrainers,readById } from "../serviceTrainers.js"
const routTrainers = express.Router()

routTrainers.get("/readAll", (req, res) => {
    try {
        const trainers = readTrainers(); 
        res.status(200).json(trainers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "ettor" });
    }
})

routTrainers.get("/readById/:id", (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const trainer = readById(id);
    if (trainer) {
      res.status(200).json(trainer);
    } else {
      res.status(404).json({ message: "Trainer not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "error" });
  }
});


routTrainers.get("/readBySearch/:city/:trainingType",(req,res)=>{
    try{
      const {city,trainingType} = req.params
        const trainers = readTrainers(); 
        const searchTrainers = trainers.filter(
            trainer => trainer.city.toLowerCase() == city.toLowerCase() && 
            trainer.trainingType.toLowerCase() == trainingType.toLowerCase() 
        )
        if(searchTrainers.length > 0){
            res.status(200).json(searchTrainers)
        }else{
            res.status(404).json({ message:"No suitable information found"})
        }
    }catch(error){
        console.error(error);
        res.status(500).json({ message: "error" });
    }
})

export default routTrainers