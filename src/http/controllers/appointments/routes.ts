import { FastifyInstance } from 'fastify'

import { verifyJwt } from '@/http/middlewares/verify-jwt'

import { finishAppointment } from './finish-appointment.controller'
import { startAppointment } from './start-appointment.controller'

export async function appointmentsRoutes(app: FastifyInstance) {
  app.post('/appointments/start', { onRequest: [verifyJwt] }, startAppointment)
  app.post(
    '/appointments/:id/finish',
    { onRequest: [verifyJwt] },
    finishAppointment,
  )
}
