const express = require('express');
const path = require('path');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const serialize = require('serialize-javascript');
const proxy = require('http-proxy-middleware');

const PORT = process.env.PORT || 5000;

if (!process.env.REACT_APP_AUTH_SCOPE) {
  require('dotenv').config();
}

const env = {
  'API_URL': process.env.API_URL,
  'DYNO': process.env.DYNO || 'Not running on a dyno',
  'REACT_APP_AUTH_SCOPE': process.env.REACT_APP_AUTH_SCOPE,
  'REACT_APP_AUTH_DOMAIN': process.env.REACT_APP_AUTH_DOMAIN,
  'REACT_APP_AUTH_CLIENT_ID': process.env.REACT_APP_AUTH_CLIENT_ID,
  'REACT_APP_AUTH_AUDIENCE': process.env.REACT_APP_AUTH_AUDIENCE,
  'REACT_APP_AUTH_RESPONSE_TYPE': process.env.REACT_APP_AUTH_RESPONSE_TYPE,
  'REACT_APP_AUTH_REDIRECT_URI': process.env.REACT_APP_AUTH_REDIRECT_URI,
};

// Multi-process to utilize all CPU cores.
if (cluster.isMaster) {
  console.error(`Node cluster master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.error(`Node cluster worker ${worker.process.pid} exited: code ${code}, signal ${signal}`);
  });

} else {
  const app = express();

  // Priority serve any static files.
  app.use(express.static(path.resolve(__dirname, '../client/build')));

  app.use('/api/vms', proxy(
    {
      target: `https://${process.env.PYVIRT_API_HOSTNAME}`,
      changeOrigin: true,
      pathRewrite: {
        '^/api/vms' : '/api',
      },
      headers: {
        host: process.env.PYVIRT_API_HOSTNAME,
      }
    }));

  app.get('/env.js', function (req, res) {
    res.set('Content-Type', 'application/javascript');
    res.send('var env = ' + serialize(env));
  });

  // All remaining requests return the React app, so it can handle routing.
  app.get('*', function(request, response) {
    response.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
  });

  app.listen(PORT, function () {
    console.error(`Node cluster worker ${process.pid}: listening on port ${PORT}`);
  });
}
