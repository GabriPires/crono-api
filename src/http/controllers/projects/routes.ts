import { FastifyInstance } from 'fastify'

import { createProject } from './create.controller'

export async function projectsRoutes(app: FastifyInstance) {
  app.post('/project', createProject)
}
