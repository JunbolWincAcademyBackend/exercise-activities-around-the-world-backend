import fs from 'fs'; // ✅ For file reading and writing
import path from 'path'; // ✅ For resolving file paths

// ✅ Resolve the path to the events.json file
const filePath = path.resolve('data/events.json');

const deleteEventById = (id) => {
  // ✅ Read the content of the events.json file synchronously
  const eventsData = JSON.parse(fs.readFileSync(filePath, 'utf8')); // Parse the JSON string into a JavaScript object

  // ✅ Find the index of the event with the matching ID
  const eventIndex = eventsData.events.findIndex((event) => event.id === id);

  // ✅ If the event with the given ID doesn't exist, return null
  if (eventIndex === -1) {
    return null;
  }

  // ✅ Remove the event from the array
  const deletedEvent = eventsData.events.splice(eventIndex, 1);

  // ✅ Write the updated events array back to the events.json file
  fs.writeFileSync(filePath, JSON.stringify(eventsData, null, 2)); // Write the data with indentation

  // ✅ Return the deleted event
  return deletedEvent;
};

export default deleteEventById;
