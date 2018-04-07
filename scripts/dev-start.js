process.env.NODE_ENV = 'development';
const nodemon = require('nodemon');

nodemon('--exec babel-node --presets=babel-preset-env ./server/main.js --watch ./server');

nodemon.on('start', () => {
  console.log('nodemon App has started');
}).on('quit', () => {
  console.log('nodemon App has quit');
}).on('restart', (files) => {
  console.log('nodemon App has restarted due to :', files);
});
