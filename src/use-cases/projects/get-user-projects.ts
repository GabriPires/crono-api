import { ProjectsRepository } from '@/repositories/projects-repository'

export class GetUserProjectsUseCase {
  constructor(private readonly projectsRepository: ProjectsRepository) {}

  async execute(userId: string) {
    const projects = await this.projectsRepository.findManyByUserId(userId)

    return { projects }
  }
}
