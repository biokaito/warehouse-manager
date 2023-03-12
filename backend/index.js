const app = require('./app');
const config = require('./Configs');

const PORT = process.env.PORT || config.port;

const server = app.listen(PORT, () => {
  console.log('server is running on port', server.address().port);
});
