const express = require('express');
const debug = require('debug')('app');
const chalk = require('chalk');
const helmet = require('helmet');
const morgan = require('morgan');
const socket = require('socket.io');

const app = express();

const PORT = process.env.PORT || 4000;

app.use(morgan('dev'));

const server = app.listen(PORT, () => {
  debug(`Server started on port ${chalk.green.inverse(PORT)}`);
});

// -- middleware
// setup static files
app.use(express.static('public'));

// setup socket
const io = socket(server);

io.on('connection', (socket) => {
  debug(`Socket connection successful! ${chalk.green.inverse(socket.id)}`);
});
