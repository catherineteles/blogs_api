const usersService = require('../services/userService');

const usersController = {
    create: async (req, res) => {
    const { email, password, displayName, image } = usersService.validateBody(req.body);
    await usersService.checkIfUserExist({ email });

    const user = await usersService.create({ email, password, displayName, image });

    res.status(201).json(user);
  },
};

module.exports = usersController;