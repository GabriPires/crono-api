import { Appointment, Prisma } from '@prisma/client'

export interface AppointmentsRepository {
  findActiveByUserId(userId: string): Promise<Appointment | null>
  findById(id: string): Promise<Appointment | null>
  create(data: Prisma.AppointmentUncheckedCreateInput): Promise<Appointment>
  save(data: Appointment): Promise<Appointment>
}
