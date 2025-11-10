import { writeToJsonFile } from "./controler.js";
import { readFromJsonFile } from "./controler.js";


export function insertTraining(Training) {
  const check = checkDateTime(Training.coachId, Training.date, Training.time);
  if (!check.ok) {
    return check;
  }
  const data = readFromJsonFile("./db/trainings.json");
  Training.id = data[data.length - 1].id + 1;
  data.push(Training);
  writeToJsonFile("./db/trainings.json", data);  
  return { ok: true, data: Training };
}


export function deleteTraining(trainingId, userId) {
  const data = readFromJsonFile("./db/trainings.json");
  let updatedData = data.filter(
    (training) => training.id !== parseInt(trainingId)
  );
  writeToJsonFile("./db/trainings.json", updatedData);
  return trainingId
}


export function readById(id) {
  const data = readFromJsonFile("./db/trainings.json");
  let newData = data.filter((item) => {
    return item.traineeId === parseInt(id);
  });
  newData = filterPassedDate(newData);  
  newData = SortByDate(newData);
  return newData;
}


function checkDateTime(trainerId, date, time) {
  const data = readFromJsonFile("./db/trainings.json");
  const check = data.filter(
    (e) => e.coachId == trainerId && e.date == date && e.time == time
  );
  if (check.length) {
    return { ok: false, message: "The training is booked on this date." };
  }
  const selectedDateTime = new Date(`${date}T${time}`);
  const now = new Date();
  if (selectedDateTime < now) {
    return { ok: false, message: "This date has passed." };
  }
  const hour = selectedDateTime.getHours();
  if (hour < 9 || hour >= 21) {
    return { ok: false, message: "You can schedule from 9 am to 9 pm." };
  }
  return { ok: true };
}


function SortByDate(trainings) {
  trainings.sort(
    (a, b) => new Date(`${a.date}T${a.time}`) - new Date(`${b.date}T${b.time}`)
  );
  return trainings;
}


function filterPassedDate(trainings) {
  const dateTime = new Date();
  return trainings.filter((e) => new Date(`${e.date}T${e.time}`) > dateTime);
}
