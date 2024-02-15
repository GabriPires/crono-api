import { PrismaAppointmentsRepository } from '@/repositories/prisma/prisma-appointments-repository'
import { PrismaProjectsRepository } from '@/repositories/prisma/prisma-projects-repository'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'

import { StartAppointmentUseCase } from '../appointments/start-appointment'

export function makeStartAppointmentUseCase() {
  const appointmentsRepository = new PrismaAppointmentsRepository()
  const usersRepository = new PrismaUsersRepository()
  const projectsRepository = new PrismaProjectsRepository()
  const useCase = new StartAppointmentUseCase(
    appointmentsRepository,
    usersRepository,
    projectsRepository,
  )

  return useCase
}
