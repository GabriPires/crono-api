import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

import { makeCreateProjectUseCase } from '@/use-cases/factories/make-create-project-use-case'

export async function createProject(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createProjectBodySchema = z.object({
    name: z.string().min(1),
    description: z.string().min(1),
    userId: z.string().min(1),
  })

  const { name, description, userId } = createProjectBodySchema.parse(
    request.body,
  )

  const createProjectUseCase = makeCreateProjectUseCase()

  await createProjectUseCase.execute({ name, description, userId })

  return reply.code(201).send()
}
