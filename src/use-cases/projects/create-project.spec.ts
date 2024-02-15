import { InMemoryProjectsRepository } from '@/repositories/in-memory/in-memory-projects-repository'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'

import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { CreateProjectUseCase } from './create-project'

let projectsRepository: InMemoryProjectsRepository
let usersRepository: InMemoryUsersRepository
let sut: CreateProjectUseCase

describe('Create Project', () => {
  beforeEach(async () => {
    projectsRepository = new InMemoryProjectsRepository()
    usersRepository = new InMemoryUsersRepository()
    sut = new CreateProjectUseCase(projectsRepository, usersRepository)

    await usersRepository.create({
      id: 'user-id',
      name: 'User Name',
      email: 'user-email',
      password_hash: 'user-password-hash',
    })
  })

  it('should be able to create a new project', async () => {
    const { project } = await sut.execute({
      name: 'Project Name',
      description: 'Project Description',
      userId: 'user-id',
    })

    expect(project.id).toEqual(expect.any(String))
  })

  it('should not be able to create a new project with a non-existing user', async () => {
    await expect(
      sut.execute({
        name: 'Project Name',
        description: 'Project Description',
        userId: 'non-existing-user-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
