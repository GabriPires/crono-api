import { InMemoryProjectsRepository } from '@/repositories/in-memory/in-memory-projects-repository'

import { CreateProjectUseCase } from './create-project'

let projectsRepository: InMemoryProjectsRepository
let sut: CreateProjectUseCase

describe('Create Project', () => {
  beforeEach(() => {
    projectsRepository = new InMemoryProjectsRepository()
    sut = new CreateProjectUseCase(projectsRepository)
  })

  it('should be able to create a new project', async () => {
    const { project } = await sut.execute({
      name: 'Project Name',
      description: 'Project Description',
      userId: 'user-id',
    })

    expect(project.id).toEqual(expect.any(String))
  })
})
