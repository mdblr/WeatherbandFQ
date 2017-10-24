const path = require('path');

const config = {};

config.entry = './js/app.js';
config.output = {
  path: path.resolve(__dirname, 'dist'),
  filename: 'bundle.js'
}

module.exports = config;
