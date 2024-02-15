import { Appointment, Prisma } from '@prisma/client'

import { prisma } from '@/lib/prisma'

import { AppointmentsRepository } from '../appointment-repository'

export class PrismaAppointmentsRepository implements AppointmentsRepository {
  async findActiveByUserId(userId: string): Promise<Appointment | null> {
    const appointment = await prisma.appointment.findFirst({
      where: {
        userId,
        current: true,
      },
    })

    return appointment
  }

  async findById(id: string): Promise<Appointment | null> {
    const appointment = await prisma.appointment.findUnique({
      where: {
        id,
      },
    })

    return appointment
  }

  async create(
    data: Prisma.AppointmentUncheckedCreateInput,
  ): Promise<Appointment> {
    const appointment = await prisma.appointment.create({
      data,
    })

    return appointment
  }

  async save(data: Appointment): Promise<Appointment> {
    const appointment = await prisma.appointment.update({
      where: {
        id: data.id,
      },
      data,
    })

    return appointment
  }
}
