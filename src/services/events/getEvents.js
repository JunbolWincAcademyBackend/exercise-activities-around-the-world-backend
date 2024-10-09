import fs from 'fs'; // ✅ For file reading
import path from 'path'; // ✅ For resolving file paths

// ✅ Resolve the path to the events.json file
const filePath = path.resolve('data/events.json');

const getEvents = (title, location) => {
  // ✅ Read the content of the events.json file synchronously
  const eventsData = JSON.parse(fs.readFileSync(filePath, 'utf8')); // Parse the JSON string into a JavaScript object

  let events = eventsData.events;

  // ✅ Filter by title if provided
  if (title) {
    events = events.filter((event) => event.title === title);
  }

  // ✅ Filter by location if provided
  if (location) {
    events = events.filter((event) => event.location === location);
  }

  return events;
};

export default getEvents;

