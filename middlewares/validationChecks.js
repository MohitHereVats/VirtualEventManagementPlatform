const { ProfileTypes } = require("../constants");

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

const validRegistrationRequest = (req, res, next) => {
    const { email, name, password, profile } = req.body;

    // console.log("Validating registration request:", req.body);

    if (!email || typeof email !== 'string' || !isValidEmail(email)) {
        return res.status(400).json({ error: 'Invalid Email' });
    }

    if (!name || typeof name !== 'string' || name.trim().length === 0) {
        return res.status(400).json({ error: 'Invalid Name' });
    }

    if (!password || password.length < 6) {
        return res.status(400).json({ error: 'Password must be at least 6 characters long' });
    }

    if (!profile || (profile !== ProfileTypes.ORGANIZER && profile !== ProfileTypes.ATTENDEE)) {
        return res.status(400).json({ error: 'Profile must be either ORGANIZER or ATTENDEE' });
    }

    next();
};

const validLoginRequest = (req, res, next) => {
    const { email, password } = req.body;

    if (!email || typeof email !== 'string' || !isValidEmail(email)) {
        return res.status(400).json({ error: 'Invalid Email' });
    }

    if (!password || password.length < 6) {
        return res.status(400).json({ error: 'Password must be at least 6 characters long' });
    }

    next();
};

const validEventCreationRequest = (req, res, next) => {
    const { name, description, date } = req.body;

    if (!name || typeof name !== 'string' || name.trim().length === 0) {
        return res.status(400).json({ error: 'Invalid Name' });
    }

    if (!description || typeof description !== 'string' || description.trim().length === 0) {
        return res.status(400).json({ error: 'Invalid Description' });
    }

    if (!date || isNaN(new Date(date).getTime())) {
        return res.status(400).json({ error: 'Invalid Date' });
    }

    next();
};

module.exports = {
    validRegistrationRequest,
    validLoginRequest,
    validEventCreationRequest,
};
