import { PrismaAppointmentsRepository } from '@/repositories/prisma/prisma-appointments-repository'

import { GetCurrentAppointmentUseCase } from '../appointments/get-current-appointment'

export function makeGetCurrentAppointmentUseCase() {
  const appointmentsRepository = new PrismaAppointmentsRepository()
  const useCase = new GetCurrentAppointmentUseCase(appointmentsRepository)

  return useCase
}
