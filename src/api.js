const express = require('express');
require('express-async-errors');

const authRouter = require('./routes/authRouter');
const userRouter = require('./routes/userRouter');

// ...

const app = express();

app.use(express.json());

app.use('/login', authRouter);

app.use('/user', userRouter);

app.use((err, _req, res, _next) => {
    const { message, name, code } = err;
    switch (name) {
      case 'ValidationError': res.status(code).json({ message }); break;
      case 'UnauthorizedError': res.status(401).json({ message }); break;
      default: console.warn(err); res.sendStatus(500);
    }
});
  
// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
