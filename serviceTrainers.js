import { writeToJsonFile } from "./controler.js";
import { readFromJsonFile } from "./controler.js";

export function readTrainers(){
    const data = readFromJsonFile("./db/trainers.json")
    return data
}


export function readById(id){
    const trainers = readFromJsonFile("./db/trainers.json")
    const trainer = trainers.filter((t) => t.id === id)
    return trainer[0]
}