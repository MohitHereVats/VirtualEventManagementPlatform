const { getUniqueId } = require("../utils");

// In Map Key is eventId and value is Event object
// This is a simple in-memory database for demonstration purposes.
const events = new Map();

class Event {
  constructor(name, description, organizerId, date) {
    this.name = name;
    this.description = description;
    this.organizerId = organizerId;
    this.date = date;
    this.eventId = getUniqueId();
    this.attendees = []; // Array to hold userIds of attendees
  }

  createEvent = () => {
    events.set(this.eventId, this);
  };

  static getAllEvents = () => {
    let allEvents = [];
    for (let event of events.values()) {
      allEvents.push({
        eventId: event.eventId,
        name: event.name,
        description: event.description,
        organizerId: event.organizerId,
        date: event.date,
        // attendees: event.attendees.length, // Return count of attendees
      });
    }
    return allEvents;
  }

  static getEventById = (eventId) => {
    return events.get(eventId);
  };

  static updateEvent = (eventId, updatedData) => {
    const event = events.get(eventId);
    if (!event) {
      throw new Error("Event not found");
    }
    Object.assign(event, updatedData);
    events.set(eventId, event);
  };

  static deleteEvent = (eventId) => {
    const event = events.get(eventId);
    if (!event) {
      throw new Error("Event not found");
    }
    events.delete(eventId);
  };
}

module.exports = {
  Event,
};
