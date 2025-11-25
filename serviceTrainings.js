import { writeToJsonFile, readFromJsonFile } from "./controler.js";

export function insertTraining(training) {
  const dateTime = new Date(training.dateTime);

  const data = readFromJsonFile("./db/trainings.json");
  const exists = data.find(
    (t) =>
      t.trainerId === training.trainerId &&
      new Date(t.dateTime).getTime() === dateTime.getTime()
  );

  if (exists) {
    return { ok: false, message: "The training is booked on this date." };
  }

  const now = new Date();
  if (dateTime < now) {
    return { ok: false, message: "This date has passed." };
  }

  const hour = dateTime.getHours();
  if (hour < 9 || hour >= 21) {
    return { ok: false, message: "You can schedule from 9 am to 9 pm." };
  }

  training.id = data.length > 0 ? data[data.length - 1].id + 1 : 1;
  data.push(training);
  writeToJsonFile("./db/trainings.json", data);

  return { ok: true, data: training };
}

export function deleteTraining(trainingId) {
  const data = readFromJsonFile("./db/trainings.json");
  const updatedData = data.filter((t) => t.id !== parseInt(trainingId));
  writeToJsonFile("./db/trainings.json", updatedData);
  return trainingId;
}

export function readById(traineeId) {
  const data = readFromJsonFile("./db/trainings.json");
  let newData = data.filter((t) => t.traineeId === parseInt(traineeId));
  newData = filterPassedDate(newData);
  newData = sortByDate(newData);
  return newData;
}

function sortByDate(trainings) {
  trainings.sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime));
  return trainings;
}

function filterPassedDate(trainings) {
  const now = new Date();
  return trainings.filter((t) => new Date(t.dateTime) > now);
}
