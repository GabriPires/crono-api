import { PrismaAppointmentsRepository } from '@/repositories/prisma/prisma-appointments-repository'

import { FinishAppointmentUseCase } from '../appointments/finish-appointment'

export function makeFinishAppointmentUseCase() {
  const appointmentsRepository = new PrismaAppointmentsRepository()
  const useCase = new FinishAppointmentUseCase(appointmentsRepository)

  return useCase
}
