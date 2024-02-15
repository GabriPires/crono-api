import { randomUUID } from 'node:crypto'

import { Appointment, Prisma } from '@prisma/client'

import { AppointmentsRepository } from '../appointment-repository'

export class InMemoryAppointmentsRepository implements AppointmentsRepository {
  public appointments: Appointment[] = []

  async create(data: Prisma.AppointmentUncheckedCreateInput) {
    const appointment: Appointment = {
      id: data.id ?? randomUUID(),
      userId: data.userId,
      projectId: data.projectId,
      current: data.current,
      startDate: new Date(),
      description: data.description,
      endDate: null,
    }

    this.appointments.push(appointment)

    return appointment
  }

  async findActiveByUserId(userId: string): Promise<Appointment | null> {
    const appointment = this.appointments.find(
      (appointment) => appointment.userId === userId && appointment.current,
    )

    if (!appointment) {
      return null
    }

    return appointment
  }
}
