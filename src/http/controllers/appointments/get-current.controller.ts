import { FastifyReply, FastifyRequest } from 'fastify'

import { makeGetCurrentAppointmentUseCase } from '@/use-cases/factories/make-get-current-appointment-use-case'

export async function getCurrentAppointment(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const useCase = makeGetCurrentAppointmentUseCase()

  const { appointment } = await useCase.execute({
    userId: request.user.sub,
  })

  return reply.code(201).send({
    appointment,
  })
}
