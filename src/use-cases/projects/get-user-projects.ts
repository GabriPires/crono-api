import { ProjectsRepository } from '@/repositories/projects-repository'

interface GetUserProjectsRequest {
  userId: string
}

export class GetUserProjectsUseCase {
  constructor(private readonly projectsRepository: ProjectsRepository) {}

  async execute({ userId }: GetUserProjectsRequest) {
    const projects = await this.projectsRepository.findManyByUserId(userId)

    return { projects }
  }
}
