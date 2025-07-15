require("dotenv").config();
const express = require("express");

const authRoutes = require("./routes/auth");
const eventRoutes = require("./routes/events");


const PORT = process.env.port || 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", authRoutes);
app.use("/events", eventRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the Virtual Event Management Platform!");
});

// Error handling middleware
app.use((req, res, next) => {
  res.status(404).send("Route not found");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
