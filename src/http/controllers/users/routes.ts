import { FastifyInstance } from 'fastify'

import { authenticate } from './authenticate.controller'
import { refresh } from './refresh.controller'
import { register } from './register.controller'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/register', register)
  app.post('/authenticate', authenticate)
  app.post('/refresh', refresh)
}
