import { FastifyInstance } from 'fastify'

import { verifyJwt } from '@/http/middlewares/verify-jwt'

import { authenticate } from './authenticate.controller'
import { logout } from './logout.controller'
import { profile } from './me.controller'
import { refresh } from './refresh.controller'
import { register } from './register.controller'

export async function usersRoutes(app: FastifyInstance) {
  app.get('/me', { onRequest: [verifyJwt] }, profile)
  app.post('/register', register)
  app.post('/authenticate', authenticate)
  app.post('/logout', logout)
  app.post('/refresh', refresh)
}
