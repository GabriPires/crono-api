import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

import { makeGetUserProjectsUseCase } from '@/use-cases/factories/make-get-user-projects-use-case'

export async function getUserProjects(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getUserProjectsParamsSchema = z.object({
    isArchived: z.boolean().optional().default(false),
  })

  const { isArchived } = getUserProjectsParamsSchema.parse(request.query)

  const useCase = makeGetUserProjectsUseCase()

  const { projects } = await useCase.execute({
    userId: request.user.sub,
    isArchived,
  })

  reply.status(200).send({ projects })
}
