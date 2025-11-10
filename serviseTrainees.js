import { writeToJsonFile } from "./controler.js";
import { readFromJsonFile } from "./controler.js";

export function insertTrainees(Trainees){
    const data = readFromJsonFile("./db/trainees.json")
    const check = data.filter(e => e.name === Trainees.name && e.email === Trainees.email)
    if(check[0]){
        return false
    }
    Trainees.id = data[data.length-1].id + 1
    Trainees.profileImage =  "/image.png"
    data.push(Trainees)
    writeToJsonFile("./db/trainees.json",data)
    return login(Trainees)
}

export function readTrainees(){
    const data = readFromJsonFile("./db/trainees.json")
    return data
}

export function login(Trainees){
    const trainees = readTrainees()
    const newTrainees = trainees.filter((t) => 
        t.name === Trainees.name && t.email === Trainees.email)
    if(newTrainees.length>0){
        return newTrainees[0]
    }else{
        return null
    }
}

