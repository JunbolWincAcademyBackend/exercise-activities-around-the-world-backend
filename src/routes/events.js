import express from 'express';
import fs from 'fs';
import path from 'path';
import getEvents from '../services/events/getEvents.js'; // Corrected path
import getEventById from '../services/events/getEventById.js'; // Corrected path
import createEvent from '../services/events/createEvent.js'; // Corrected path
import updateEventById from '../services/events/updateEventById.js'; // Corrected path
import deleteEventById from '../services/events/deleteEventById.js'; // Corrected path
import authMiddleware from '../middleware/advancedAuth.js'; // Corrected path
import NotFoundError from '../errors/NotFoundError.js'; // Corrected path

const eventsRouter = express.Router();

// Route to get all events with optional filters (title, location)
eventsRouter.get('/', (req, res, next) => {
  try {
    const { title, location } = req.query;
    const events = getEvents(title, location);
    res.status(200).json(events);
  } catch (error) {
    next(error);
  }
});

// Route to create a new event
eventsRouter.post('/', authMiddleware, async (req, res, next) => {
  try {
    const {
      name,
      description,
      location,
      image,
      startTime,
      endTime,
      createdBy,
      categoryIds,
    } = req.body;

    const newEvent = createEvent(
      name,
      description,
      location,
      image,
      startTime,
      endTime,
      createdBy,
      categoryIds
    );

    res.status(201).json(newEvent);
  } catch (error) {
    next(error);
  }
});

// Route to get an event by ID
eventsRouter.get('/:id', (req, res, next) => {
  try {
    const { id } = req.params;
    const event = getEventById(id);

    if (!event) {
      throw new NotFoundError('Event', id);
    }

    res.status(200).json(event);
  } catch (error) {
    next(error);
  }
});

// Route to delete an event by ID
eventsRouter.delete('/:id', authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedEventId = deleteEventById(id);

    if (!deletedEventId) {
      throw new NotFoundError('Event', id);
    }

    res.status(200).json({
      message: `Event with id ${deletedEventId} successfully deleted`,
    });
  } catch (error) {
    next(error);
  }
});

// Route to update an event by ID
eventsRouter.put('/:id', authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      name,
      description,
      location,
      image,
      startTime,
      endTime,
      createdBy,
      categoryIds,
    } = req.body;

    const updatedEvent = updateEventById(id, {
      name,
      description,
      location,
      image,
      startTime,
      endTime,
      createdBy,
      categoryIds,
    });

    if (!updatedEvent) {
      throw new NotFoundError('Event', id);
    }

    res.status(200).json({
      message: `Event with id ${id} successfully updated`,
      event: updatedEvent,
    });
  } catch (error) {
    next(error);
  }
});

export default eventsRouter;
