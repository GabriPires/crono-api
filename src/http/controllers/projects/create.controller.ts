import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

import { makeCreateProjectUseCase } from '@/use-cases/factories/make-create-project-use-case'

export async function createProject(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createProjectBodySchema = z.object({
    name: z.string().min(1),
    description: z.string(),
  })

  const { name, description } = createProjectBodySchema.parse(request.body)

  const createProjectUseCase = makeCreateProjectUseCase()

  await createProjectUseCase.execute({
    name,
    description,
    userId: request.user.sub,
  })

  return reply.code(201).send()
}
