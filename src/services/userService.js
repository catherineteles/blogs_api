const { User } = require('../database/models');

const usersService = {
  create: async ({ email, password, displayName, image }) => {
    const user = await User.create({ email, password, displayName, image });
    return user;
  },

};

module.exports = usersService; 