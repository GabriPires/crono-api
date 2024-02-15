import { FastifyReply, FastifyRequest } from 'fastify'

import { makeGetUserProjectsUseCase } from '@/use-cases/factories/make-get-user-projects-use-case'

export async function getUserProjects(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const useCase = makeGetUserProjectsUseCase()

  const { projects } = await useCase.execute({
    userId: request.user.sub,
  })

  reply.status(200).send({ projects })
}
