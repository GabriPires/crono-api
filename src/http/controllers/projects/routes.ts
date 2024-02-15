import { FastifyInstance } from 'fastify'

import { verifyJwt } from '@/http/middlewares/verify-jwt'

import { createProject } from './create.controller'
import { getUserProjects } from './get-user-projects.controller'

export async function projectsRoutes(app: FastifyInstance) {
  app.get('/projects', { onRequest: [verifyJwt] }, getUserProjects)
  app.post('/projects', { onRequest: [verifyJwt] }, createProject)
}
