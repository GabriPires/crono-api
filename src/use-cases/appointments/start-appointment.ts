import { AppointmentsRepository } from '@/repositories/appointment-repository'
import { ProjectsRepository } from '@/repositories/projects-repository'
import { UsersRepository } from '@/repositories/users-repository'

import { AlreadyHasActiveAppointment } from '../errors/already-has-active-appointment'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface StartAppointmentRequest {
  userId: string
  projectId: string
}

export class StartAppointmentUseCase {
  constructor(
    private appointmentsRepository: AppointmentsRepository,
    private usersRepository: UsersRepository,
    private projectsRepository: ProjectsRepository,
  ) {}

  async execute({ userId, projectId }: StartAppointmentRequest) {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    const project = await this.projectsRepository.findById(projectId)

    if (!project) {
      throw new ResourceNotFoundError()
    }

    const activeAppointment =
      await this.appointmentsRepository.findActiveByUserId(userId)

    if (activeAppointment) {
      throw new AlreadyHasActiveAppointment()
    }

    const appointment = await this.appointmentsRepository.create({
      userId,
      projectId,
      startDate: new Date(),
      description: '',
      current: true,
    })

    return { appointment }
  }
}
