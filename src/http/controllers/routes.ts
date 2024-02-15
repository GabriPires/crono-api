import { FastifyInstance } from 'fastify'

import { appointmentsRoutes } from './appointments/routes'
import { projectsRoutes } from './projects/routes'
import { usersRoutes } from './users/routes'

export async function routes(app: FastifyInstance) {
  app.register(usersRoutes)
  app.register(projectsRoutes)
  app.register(appointmentsRoutes)
}
