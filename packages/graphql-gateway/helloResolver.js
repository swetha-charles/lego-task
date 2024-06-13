module.exports = {
  hello: (parent, { name }) => {
    if (name) {
      return `Hello there ${name}!`;
    }
    return `Hello there you!`;
  },
};
