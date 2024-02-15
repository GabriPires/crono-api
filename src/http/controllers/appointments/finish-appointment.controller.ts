import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

import { makeFinishAppointmentUseCase } from '@/use-cases/factories/make-finish-appointment-use-case'

export async function finishAppointment(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const finishAppointmentParamsSchema = z.object({
    id: z.string(),
  })

  const { id } = finishAppointmentParamsSchema.parse(request.params)

  const finishAppointmentBodySchema = z.object({
    description: z.string(),
  })

  const { description } = finishAppointmentBodySchema.parse(request.body)

  const useCase = makeFinishAppointmentUseCase()

  await useCase.execute({
    appointmentId: id,
    description,
  })

  return reply.code(204).send()
}
