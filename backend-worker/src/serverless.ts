import * as dotenv from 'dotenv';

// Require the framework
import Fastify from 'fastify';
import router from '../dist/router';
dotenv.config();

// Instantiate Fastify with some config
const app = Fastify({
  logger: false,
});

app.register(router);

export default async(req, res) => {
  await app.ready();
  app.server.emit('request', req, res);
};
