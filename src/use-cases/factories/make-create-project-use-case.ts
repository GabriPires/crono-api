import { PrismaProjectsRepository } from '@/repositories/prisma/prisma-projects-repository'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'

import { CreateProjectUseCase } from '../projects/create-project'

export function makeCreateProjectUseCase() {
  const projectsRepository = new PrismaProjectsRepository()
  const usersRepository = new PrismaUsersRepository()

  const useCase = new CreateProjectUseCase(projectsRepository, usersRepository)

  return useCase
}
