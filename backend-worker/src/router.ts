import type { FastifyInstance } from 'fastify';
import userController from './controller/userController';
import indexController from './controller/indexController';
import descriptionController from './controller/descriptionController';

export default async function router(fastify: FastifyInstance) {
  fastify.register(userController, { prefix: '/api/v1/user' });
  fastify.register(indexController, { prefix: '/' });
  fastify.register(descriptionController, { prefix: '/api/desc' });
}
