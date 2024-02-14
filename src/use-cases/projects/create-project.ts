import { Project } from '@prisma/client'

import { ProjectsRepository } from '@/repositories/projects-repository'

interface CreateProjectRequest {
  name: string
  description: string
  userId: string
}

interface CreateProjectResponse {
  project: Project
}

export class CreateProjectUseCase {
  constructor(private projectsRepository: ProjectsRepository) {}

  async execute({
    name,
    description,
    userId,
  }: CreateProjectRequest): Promise<CreateProjectResponse> {
    const project = await this.projectsRepository.create({
      name,
      description,
      userId,
    })

    return { project }
  }
}
