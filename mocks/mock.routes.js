/* The purpose of this file is to serve mock JSON files not in use in this project */
const path = require('path');
const forEach = require('lodash/forEach');
const CONFIG_GETS = require('./mock.conf.get');
const CONFIG_POSTS = require('./mock.conf.post');
const fs = require('fs');



const MOCK_CONF_GET = Object.assign({}, CONFIG_GETS);
const MOCK_CONF_POST = Object.assign({}, CONFIG_POSTS);

const appRouter = function(app) {

  forEach(MOCK_CONF_GET, (mock, url) => {
    app.get(url, (req, res) => {
      const target = path.join(__dirname, mock);
      console.log('[mock] serving', mock);
      req.headers["X-Custom-Header"] = "yes";
      res.sendFile(target);
    });

  });

  forEach(MOCK_CONF_POST, (mock, url) => {
    app.get(url, (req, res) => {
      const target = path.join(__dirname, mock);
      console.log('[mock] serving', mock);
      req.headers["X-Custom-Header"] = "yes";
      res.sendFile(target);
    });

  });
};

module.exports = appRouter;

