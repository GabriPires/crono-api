import { FastifyReply, FastifyRequest } from 'fastify'

import { makeGetUserProfileUseCase } from '@/use-cases/factories/make-get-user-profile-use-case'

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  const useCase = makeGetUserProfileUseCase()

  const { user } = await useCase.execute({
    userId: request.user.sub,
  })

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password_hash, ...userWithoutPassword } = user

  return reply.status(200).send(userWithoutPassword)
}
