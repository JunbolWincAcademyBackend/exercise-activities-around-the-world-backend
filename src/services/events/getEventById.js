import fs from 'fs'; // ✅ For file reading
import path from 'path'; // ✅ For resolving file paths

// ✅ Resolve the path to the events.json file
const filePath = path.resolve('data/events.json');

const getEventById = (id) => {
  // ✅ Read the content of the events.json file synchronously
  const eventsData = JSON.parse(fs.readFileSync(filePath, 'utf8')); // Parse the JSON string into a JavaScript object

  // ✅ Find and return the event with the matching ID
  return eventsData.events.find((event) => event.id === id);
};

export default getEventById;
