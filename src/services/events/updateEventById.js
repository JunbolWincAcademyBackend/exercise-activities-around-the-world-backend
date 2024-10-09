import fs from 'fs'; // ✅ For file reading and writing
import path from 'path'; // ✅ For resolving file paths

// ✅ Resolve the path to the events.json file
const filePath = path.resolve('data/events.json');

const updateEventById = (id, updatedFields) => {
  // ✅ Read the content of the events.json file synchronously
  const eventsData = JSON.parse(fs.readFileSync(filePath, 'utf8')); // Parse the JSON string into a JavaScript object

  // ✅ Find the event with the matching ID
  const event = eventsData.events.find((event) => event.id === id);

  // ✅ If the event with the given ID doesn't exist, return null
  if (!event) {
    return null;
  }

  // ✅ Update the event with the new fields using the spread operator
  Object.assign(event, updatedFields);

  // ✅ Write the updated events array back to the events.json file
  fs.writeFileSync(filePath, JSON.stringify(eventsData, null, 2)); // Write the data with indentation

  // ✅ Return the updated event
  return event;
};

export default updateEventById;
