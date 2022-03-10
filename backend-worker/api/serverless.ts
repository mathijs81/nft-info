import * as dotenv from 'dotenv';
import type { VercelRequest, VercelResponse } from '@vercel/node';

// Require the framework
import Fastify from 'fastify';
import router from '../src/router';

dotenv.config();

// Instantiate Fastify with some config
const app = Fastify({
  logger: false,
});

app.register(router);

export default async(req: VercelRequest, res: VercelResponse) => {
  await app.ready();
  app.server.emit('request', req, res);
};
