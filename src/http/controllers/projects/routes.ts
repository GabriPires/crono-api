import { FastifyInstance } from 'fastify'

import { verifyJwt } from '@/http/middlewares/verify-jwt'

import { createProject } from './create.controller'

export async function projectsRoutes(app: FastifyInstance) {
  app.post('/projects', { onRequest: [verifyJwt] }, createProject)
}
