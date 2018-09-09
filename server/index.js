const express = require('express');
const path = require('path');
const serialize = require('serialize-javascript');
const proxy = require('http-proxy-middleware');
const helmet = require('helmet');

const PORT = process.env.PORT || 5000;

if (!process.env.REACT_APP_AUTH_SCOPE) {
  require('dotenv').config();
}

const env = {
  'API_HOST': process.env.API_HOST,
  'DYNO': process.env.DYNO || 'Not running on a dyno',
  'REACT_APP_AUTH_SCOPE': process.env.REACT_APP_AUTH_SCOPE,
  'REACT_APP_AUTH_DOMAIN': process.env.REACT_APP_AUTH_DOMAIN,
  'REACT_APP_AUTH_CLIENT_ID': process.env.REACT_APP_AUTH_CLIENT_ID,
  'REACT_APP_AUTH_AUDIENCE': process.env.REACT_APP_AUTH_AUDIENCE,
  'REACT_APP_AUTH_RESPONSE_TYPE': process.env.REACT_APP_AUTH_RESPONSE_TYPE,
  'REACT_APP_AUTH_REDIRECT_URI': process.env.REACT_APP_AUTH_REDIRECT_URI,
};

const app = express();

app.use(helmet());

const proxyConfig = {
  target: process.env.API_HOST,
  changeOrigin: true
};

if (process.env.API_BASE_PATH) {
  proxyConfig.pathRewrite = {
    '^/': process.env.API_BASE_PATH
  }
}

const apiProxy = proxy(proxyConfig);

// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, '../client/build')));

app.use('/graphql', apiProxy);
app.use('/graphiql', apiProxy);

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

