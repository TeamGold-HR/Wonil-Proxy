const express = require('express');
const path = require('path');
const httpProxy = require('http-proxy');

const apiProxy = httpProxy.createProxyServer();
const app = express();
const PORT = process.env.PORT || 8000;

const photos = 'http://localhost:3002',
      reviews = 'http://localhost:4007',
      reservation = 'http://localhost:3007',
      description = 'http://localhost:3001';


app.all('/photos/*', (req, res) => {
  console.log('redirecting to photos service');
  apiProxy.web(req, res, {target: photos});
})

app.all('/reviews/*', (req, res) => {
  console.log('redirecting to reviews service');
  apiProxy.web(req, res, {target: reviews});
})

app.all('/reservation/*', (req, res) => {
  console.log('redirecting to reservation service');
  apiProxy.web(req, res, {target: reservation});
})

app.all('/description/*', (req, res) => {
  console.log('redirecting to description service');
  apiProxy.web(req, res, {target: description});
})

app.use('/:id', express.static('public'));

app.listen(PORT, () => {
  console.log(`Server listening at ${PORT}...`);
});

module.exports = app;