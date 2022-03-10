import * as dotenv from 'dotenv';
import type { FastifyReply, FastifyRequest } from 'fastify';
// Require the framework
import Fastify from 'fastify';
import router from './router';

dotenv.config();

// Instantiate Fastify with some config
const app = Fastify({
  logger: false,
});

app.register(router);

export default async(req: FastifyRequest, res: FastifyReply) => {
  await app.ready();
  app.server.emit('request', req, res);
};
