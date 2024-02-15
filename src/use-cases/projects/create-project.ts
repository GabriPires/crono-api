import { Project } from '@prisma/client'

import { ProjectsRepository } from '@/repositories/projects-repository'
import { UsersRepository } from '@/repositories/users-repository'

import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface CreateProjectRequest {
  name: string
  description: string
  userId: string
}

interface CreateProjectResponse {
  project: Project
}

export class CreateProjectUseCase {
  constructor(
    private projectsRepository: ProjectsRepository,
    private usersRepository: UsersRepository,
  ) {}

  async execute({
    name,
    description,
    userId,
  }: CreateProjectRequest): Promise<CreateProjectResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    const project = await this.projectsRepository.create({
      name,
      description,
      userId: user.id,
    })

    return { project }
  }
}
