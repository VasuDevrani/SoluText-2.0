const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      firstName: user.firstName,
      email: user.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '1hr',
    }
  );
};

module.exports = generateToken;