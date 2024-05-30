const { UserInputError } = require('apollo-server');
const {
  ACCEPTED_USERNAME,
  ACCEPTED_PASSWORD,
} = require('@baby-octan/common/constants');
const { ISO_8601 } = require('@baby-octan/common/regularExpressions');
const { login } = require('./loginResolver');

const mockParent = {};

describe('login', () => {
  it('should throw UserInputError when no args are given', () => {
    const mockArgs = {};
    try {
      login(mockParent, mockArgs);
    } catch (e) {
      expect(e).toBeInstanceOf(UserInputError);
      expect(e.message).toBe('Invalid username or password');
    }
  });
  it('should throw UserInputError when incorrect username is given', () => {
    const mockArgs = {
      username: 'hasbro',
      password: ACCEPTED_PASSWORD,
    };
    try {
      login(mockParent, mockArgs);
    } catch (e) {
      expect(e).toBeInstanceOf(UserInputError);
    }
  });
  it('should throw UserInputError when incorrect password is given', () => {
    const mockArgs = {
      username: ACCEPTED_USERNAME,
      password: '123',
    };
    try {
      login(mockParent, mockArgs);
    } catch (e) {
      expect(e).toBeInstanceOf(UserInputError);
    }
  });
  it('should return full schema matching object with correct credentials', () => {
    const mockArgs = {
      username: ACCEPTED_USERNAME,
      password: ACCEPTED_PASSWORD,
    };
    const result = login(mockParent, mockArgs);
    expect(result).toEqual(
      expect.objectContaining({
        token: expect.any(String),
        user: expect.objectContaining({
          username: ACCEPTED_USERNAME,
          lastLoggedIn: expect.any(String),
        }),
      })
    );
    expect(result.user.lastLoggedIn).toMatch(ISO_8601);
  });
});
