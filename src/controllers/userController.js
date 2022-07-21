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

  list: async (req, res) => {
    const users = await usersService.list();
    res.status(200).json(users);
  },

  findById: async (req, res) => {
    const user = await usersService.findById(req.params.id);

    res.status(200).json(user);
  },

  deleteUser: async (req, res) => {
    const { authorization } = req.headers;
    const { data: { id } } = authService.validateToken(authorization);
    await usersService.deleteUser(id);

    res.status(204).json();
},
};

module.exports = usersController;