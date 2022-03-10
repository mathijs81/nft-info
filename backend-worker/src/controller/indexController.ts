import { promises } from 'fs';
import { resolve } from 'path';
import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

const { readFile } = promises;

export default async function indexController(fastify: FastifyInstance) {
  // GET /
  fastify.get('/', async(
    _request: FastifyRequest,
    reply: FastifyReply,
  ) => {
    const indexHtmlPath = resolve(__dirname, '../../static/index.html');
    const indexHtmlContent = await readFile(indexHtmlPath);
    reply
      .header('Content-Type', 'text/html; charset=utf-8')
      .send(indexHtmlContent);
  });
}
