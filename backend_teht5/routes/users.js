const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();

const uc = require('../controllers/usercontroller');

// rekisteröityminen eli luodaan uudet tunnarit
// http://localhost:3000/users/register
router.post('/register', uc.registerUser);
// kirjautuminen eli autentikaatio tunnareilla
router.post('/login', uc.authenticateUser);

module.exports = router;
