const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { User } = require("../models/user");

const registerController = (req, res, next) => {
  try {
    const { name, password, email, profile } = req.body;
    const user = new User(name, email, password, profile);

    const saltRounds = Number(process.env.saltRounds);
    const hashedPassword = bcrypt.hashSync(user.password, saltRounds);
    if (!hashedPassword) {
      console.log("Error hashing password");
      return res.status(500).send("Error hashing password");
    }
    user.password = hashedPassword;
    user.createUser();
    return res.status(201).json({
      message: "User registered successfully",
      userId: user.userId,
      name: user.name,
      email: user.email,
      profile: user.profile,
    });
  } catch (error) {
    console.error("Error during registration:", error);
    return res.status(500).send("Internal Server Error");
  }
};

const loginController = (req, res) => {
  try {
    const { email, password } = req.body;
    const user = User.findByEmail(email);

    if (!user) {
      return res.status(401).send("This email is not registered");
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send("Password is incorrect");
    }

    const token = User.generateAuthToken(user);
    return res.status(200).json({
      message: "Login successful",
      token: token,
    });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).send("Internal Server Error");
  }
};

module.exports = { registerController, loginController };
