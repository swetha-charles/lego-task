const { UserInputError } = require('apollo-server');

const {
  ACCEPTED_USERNAME,
  ACCEPTED_PASSWORD,
} = require('@baby-octan/common/constants');

const validateUser = (username, password) => {
  if (username === ACCEPTED_USERNAME && password === ACCEPTED_PASSWORD) {
    return true;
  }
  return false;
};

module.exports = {
  login: (parent, { username, password }) => {
    if (validateUser(username, password)) {
      const isoDateNow = new Date().toISOString();
      const token = Buffer.from(
        `${username}-${password}-${isoDateNow}`
      ).toString('base64');
      return {
        token,
        user: {
          username,
          lastLoggedIn: isoDateNow,
        },
      };
    }
    throw new UserInputError('Invalid username or password');
  },
};
