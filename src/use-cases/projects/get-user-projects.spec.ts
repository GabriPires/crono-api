import { InMemoryProjectsRepository } from '@/repositories/in-memory/in-memory-projects-repository'

import { GetUserProjectsUseCase } from './get-user-projects'

let projectsRepository: InMemoryProjectsRepository
let sut: GetUserProjectsUseCase

describe('Get User Projects', () => {
  beforeEach(() => {
    projectsRepository = new InMemoryProjectsRepository()
    sut = new GetUserProjectsUseCase(projectsRepository)
  })

  it('should return the projects of the user', async () => {
    const project1 = await projectsRepository.create({
      name: 'Project 1',
      description: 'Description 1',
      userId: 'user-id',
    })

    const project2 = await projectsRepository.create({
      name: 'Project 2',
      description: 'Description 2',
      userId: 'user-id',
    })

    const { projects } = await sut.execute({ userId: 'user-id' })

    expect(projects).toHaveLength(2)
    expect(projects[0].id).toEqual(project1.id)
    expect(projects[1].id).toEqual(project2.id)
  })

  it('should return an empty array if no projects are found', async () => {
    const { projects } = await sut.execute({ userId: 'user-id' })

    expect(projects).toEqual([])
  })

  it('should return only the non-archived projects', async () => {
    const project = await projectsRepository.create({
      name: 'Project 1',
      description: 'Description 1',
      userId: 'user-id',
    })

    await projectsRepository.create({
      name: 'Project 2',
      description: 'Description 2',
      userId: 'user-id',
      isArchived: true,
    })

    const { projects } = await sut.execute({
      userId: 'user-id',
      isArchived: false,
    })

    expect(projects).toHaveLength(1)
    expect(projects[0].id).toEqual(project.id)
  })

  it('should return only the archived projects', async () => {
    await projectsRepository.create({
      name: 'Project 1',
      description: 'Description 1',
      userId: 'user-id',
    })

    await projectsRepository.create({
      name: 'Project 2',
      description: 'Description 2',
      userId: 'user-id',
      isArchived: true,
    })

    const { projects } = await sut.execute({
      userId: 'user-id',
      isArchived: true,
    })

    expect(projects).toHaveLength(1)
    expect(projects[0].isArchived).toEqual(true)
  })
})
