const jwt = require('jsonwebtoken');

exports.generateToken = (payload, expiresIn = '1h') =>
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
