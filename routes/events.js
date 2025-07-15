const express = require("express");
const isAuthenticated = require("../middlewares/isAuthenticated");

const router = express.Router();

router.use(isAuthenticated);
const eventControllers = require("../controllers/eventControllers");
const { hasUserCreatedEvent, isUserOrganizer } = require("../middlewares/organizerChecks");
const { validEventCreationRequest } = require("../middlewares/validationChecks");

router.get("/", eventControllers.getAllEvents);
router.post("/", [isUserOrganizer, validEventCreationRequest], eventControllers.createEvent);
router.get("/:id", eventControllers.getEventById);
router.put("/:id", [isUserOrganizer, hasUserCreatedEvent, validEventCreationRequest], eventControllers.updateEvent);
router.delete("/:id", [isUserOrganizer, hasUserCreatedEvent], eventControllers.deleteEvent);
router.post("/:id/register", eventControllers.registerForEvent);

module.exports = router;
