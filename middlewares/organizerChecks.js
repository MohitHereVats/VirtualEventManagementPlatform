const { ProfileTypes } = require("../constants");
const { isStringEqual } = require("../utils");
const Event = require("../models/event").Event; 

const isUserOrganizer = (req, res, next) => {
  const user = req.user;

  if (!user || !isStringEqual(user.profile, ProfileTypes.ORGANIZER)) {
    return res.status(403).json({ message: "Access denied. User is not an organizer." });
  }

  next();
};

const hasUserCreatedEvent = (req, res, next) => {
  const eventId = req.params.id;
  const user = req.user; 
  const event = Event.getEventById(eventId); 

  if (!event || event.organizerId !== user.userId) {
    return res.status(403).json({ message: "Access denied. User has not created this event." });
  }

  next();
};

module.exports = {
  isUserOrganizer,
  hasUserCreatedEvent,
};
