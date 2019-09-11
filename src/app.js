const express = require('express');
require('./db/mongoose');
const userRouter = require('./routes/user'); // TO BE CREATED
// const roomRouter = require('./routes/room'); // TO BE CREATED

const app = express();

app.use(express.json());
app.use(userRouter); // TO BE CREATED
// app.use(roomRouter); // TO BE CREATED

module.exports = app;