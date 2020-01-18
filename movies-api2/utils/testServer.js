//Este server siempre debe ser aparte del original porque solo se usara para testeos debe correr independiente.
const express = require('express');
const supertest = require('supertest');

function testServer(route) {
  const app = express();
  app.use(express.json());
  route(app);
  return supertest(app);
}

module.exports = testServer;
