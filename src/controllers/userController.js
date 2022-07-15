const usersService = require('../services/userService');
const authService = require('../services/authService');

const usersController = {
    create: async (req, res) => {
    const { email, password, displayName, image } = usersService.validateBody(req.body);
    await usersService.checkIfUserExist({ email });

    await usersService.create({ email, password, displayName, image });
    const token = await authService.login(email, password);

    res.status(201).json({ token });
  },
};

module.exports = usersController;