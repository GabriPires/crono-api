import { PrismaProjectsRepository } from '@/repositories/prisma/prisma-projects-repository'

import { GetUserProjectsUseCase } from '../projects/get-user-projects'

export function makeGetUserProjectsUseCase() {
  const projectsRepository = new PrismaProjectsRepository()

  const useCase = new GetUserProjectsUseCase(projectsRepository)

  return useCase
}
