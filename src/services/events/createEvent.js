import { v4 as uuidv4 } from 'uuid'; // ✅ For generating unique IDs
import fs from 'fs'; // ✅ Node.js File System module to handle file reading and writing
import path from 'path'; // ✅ Path module for resolving file paths

// ✅ Resolve the path to the events.json file
const filePath = path.resolve('data/events.json');

const createEvent = (title, description, location, image, startTime, endTime, createdBy, categoryIds) => {
  // ✅ Read the content of the events.json file synchronously
  const eventsData = JSON.parse(fs.readFileSync(filePath, 'utf8')); // Parse the JSON string into a JavaScript object

  // ✅ Create a new event object with the provided data and a generated UUID
  const newEvent = {
    id: uuidv4(),
    title,
    description,
    location,
    image,
    startTime,
    endTime,
    createdBy,
    categoryIds,
  };

  // ✅ Add the new event to the existing array of events
  eventsData.events.push(newEvent);

  // ✅ Write the updated events array back to the events.json file
  fs.writeFileSync(filePath, JSON.stringify(eventsData, null, 2)); // Write the data with indentation

  // ✅ Return the newly created event
  return newEvent;
};

export default createEvent;
