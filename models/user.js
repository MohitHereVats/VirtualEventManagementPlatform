/**
 * The In Memory Database is used here and the user object contains of
 * userId, password, profile.
 */
const jwt = require("jsonwebtoken");

const { getUniqueId } = require("../utils");

//In Map Key is userId and value is User object
// This is a simple in-memory database for demonstration purposes.
const users = new Map();
const userEmails = new Map();

class User {
  constructor(name, email, password, profile) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.profile = profile; // e.g., 'ORGANIZER' or 'ATTENDEE'
    this.userId = getUniqueId();
  }

  createUser = () => {
    if (userEmails.has(this.email)) {
      throw new Error("User with this email already exists");
    }
    userEmails.set(this.email, this.userId);
    users.set(this.userId, this);
  };

  static deleteUser = (userId) => {
    const user = users.get(userId);
    if (!user) {
      throw new Error("User not found");
    }
    userEmails.delete(user.email);
    users.delete(userId);
  }

//   static updateUser = (userId, updatedData) => {
//     const user = users.get(userId);
//     if (!user) {
//       throw new Error("User not found");
//     }
//     Object.assign(user, updatedData);
//     users.set(userId, user);
//   }

  static getUserById = (userId) => {
    return users.get(userId);
  }

  static generateAuthToken = (user) => {
    const token = jwt.sign(
      { userId: user.userId, email: user.email, profile: user.profile },
      process.env.jwtSecret,
      { expiresIn: process.env.jwtExpiration }
    );
    return token;
  }

  static findByEmail = (email) => {
    return userEmails.has(email) ? users.get(userEmails.get(email)) : null;
  }
}

module.exports = {
  User,
};
