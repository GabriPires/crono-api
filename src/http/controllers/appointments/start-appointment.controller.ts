import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

import { makeStartAppointmentUseCase } from '@/use-cases/factories/make-start-appointment-use-case'

export async function startAppointment(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const startAppointmentBodySchema = z.object({
    projectId: z.string(),
  })

  const { projectId } = startAppointmentBodySchema.parse(request.body)

  const useCase = makeStartAppointmentUseCase()

  await useCase.execute({
    userId: request.user.sub,
    projectId,
  })

  return reply.code(204).send()
}
