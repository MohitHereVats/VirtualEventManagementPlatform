const nodemailer = require("nodemailer");
const sgTransport = require("nodemailer-sendgrid-transport");

const transporter = nodemailer.createTransport(
  sgTransport({
    auth: {
      api_key: process.env.sendGridApiKey,
    },
  })
);

const Event = require("../models/event").Event;

const getAllEvents = (req, res) => {
  const events = Event.getAllEvents();
  res.status(200).json(events);
};

const createEvent = (req, res) => {
  const { name, description, date } = req.body;
  const newEvent = new Event(name, description, req.user.userId, date);

  newEvent.createEvent();

  res.status(201).json(newEvent);
};

const getEventById = (req, res) => {
  const eventId = req.params.id;

  const event = Event.getEventById(eventId);

  if (!event) {
    return res.status(404).json({ error: "Event not found" });
  }

  res.status(200).json(event);
};

const updateEvent = (req, res) => {
  const eventId = req.params.id;
  const { name, description, date } = req.body;

  const event = Event.getEventById(eventId);

  if (!event) {
    return res.status(404).json({ error: "Event not found" });
  }

  try {
    Event.updateEvent(eventId, { name, description, date });
    res.status(200).json({ message: "Event updated successfully", eventId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteEvent = (req, res) => {
  const eventId = req.params.id;
  const event = Event.getEventById(eventId);

  if (!event) {
    return res.status(404).json({ error: "Event not found" });
  }

  Event.deleteEvent(eventId);

  res.status(200).json({ message: "Event deleted successfully", event: event });
};

const registerForEvent = (req, res) => {
  const eventId = req.params.id;
  const userId = req.user.userId;
  const email = req.user.email;
 
  const event = Event.getEventById(eventId);

  if (!event) {
    return res.status(404).json({ error: "Event not found" });
  }
  if (event.attendees.includes(userId)) {
    return res
      .status(400)
      .json({ error: "User already registered for this event" });
  }

  event.attendees.push(userId);
  res.status(200).json({ message: "User registered successfully", event });
  
  //Note: The Organizer's email should be registered with SendGrid to send emails.
  // Sending email notification to the user
  //Mocking From with a static email for demonstration purposes.
  transporter
    .sendMail({
      to: email,
      from: "mohitverma228@gmail.com",
      subject: "You Have Successfully Registered for the Event!",
      html: `
        <h1>Registration Successful</h1>
        <p>Dear User,</p>
        <p>You have successfully registered for the event: <strong>${event.name}</strong>.</p>
        <p>Event Details:</p>
        <ul>
          <li><strong>Description:</strong> ${event.description}</li>
          <li><strong>Date:</strong> ${new Date(event.date).toLocaleDateString()}</li>
        </ul>
        <p>Thank you for registering!</p>
      `,
    })
    .then((res) => {
      console.log("Email sent successfully", res);
    })
    .catch((error) => {
      console.error("Error sending email:", error);
    });
};

module.exports = {
  getEventById,
  createEvent,
  deleteEvent,
  getAllEvents,
  updateEvent,
  registerForEvent,
};
