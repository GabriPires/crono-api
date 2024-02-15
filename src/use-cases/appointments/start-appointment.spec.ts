import { InMemoryAppointmentsRepository } from '@/repositories/in-memory/in-memory-appointments-repository'
import { InMemoryProjectsRepository } from '@/repositories/in-memory/in-memory-projects-repository'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'

import { AlreadyHasActiveAppointment } from '../errors/already-has-active-appointment'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { StartAppointmentUseCase } from './start-appointment'

let usersRepository: InMemoryUsersRepository
let projectsRepository: InMemoryProjectsRepository
let appointmentsRepository: InMemoryAppointmentsRepository
let sut: StartAppointmentUseCase

describe('Start Appointment', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    projectsRepository = new InMemoryProjectsRepository()
    appointmentsRepository = new InMemoryAppointmentsRepository()
    sut = new StartAppointmentUseCase(
      appointmentsRepository,
      usersRepository,
      projectsRepository,
    )

    usersRepository.create({
      id: 'user-id',
      name: 'John Doe',
      email: 'johndoe@email.com',
      password_hash: 'password',
    })

    projectsRepository.create({
      id: 'project-id',
      name: 'Project',
      description: 'Project description',
      userId: 'user-id',
    })
  })

  it('should be able to start a new appointment', async () => {
    const appointment = await sut.execute({
      userId: 'user-id',
      projectId: 'project-id',
    })

    expect(appointment.id).toEqual(expect.any(String))
  })

  it('should not be able to start a new appointment if user has another active appointment', async () => {
    appointmentsRepository.create({
      userId: 'user-id',
      projectId: 'project-id',
      current: true,
      startDate: new Date(),
      description: '',
    })

    await expect(
      sut.execute({
        userId: 'user-id',
        projectId: 'project-id',
      }),
    ).rejects.toBeInstanceOf(AlreadyHasActiveAppointment)
  })

  it('should not be able to start a new appointment if user does not exist', async () => {
    await expect(
      sut.execute({
        userId: 'non-existing-user-id',
        projectId: 'non-existing-project-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not be able to start a new appointment if project does not exist', async () => {
    await expect(
      sut.execute({
        userId: 'user-id',
        projectId: 'non-existing-project-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
