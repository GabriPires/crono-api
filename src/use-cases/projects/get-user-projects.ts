import { ProjectsRepository } from '@/repositories/projects-repository'

interface GetUserProjectsRequest {
  userId: string
  isArchived?: boolean
}

export class GetUserProjectsUseCase {
  constructor(private readonly projectsRepository: ProjectsRepository) {}

  async execute({ userId, isArchived = false }: GetUserProjectsRequest) {
    const projects = await this.projectsRepository.findManyByUserId(userId, {
      isArchived,
    })

    return { projects }
  }
}
