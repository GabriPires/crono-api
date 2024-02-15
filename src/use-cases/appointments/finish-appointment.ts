import { AppointmentsRepository } from '@/repositories/appointment-repository'

import { AppointmentAlreadyFinishedError } from '../errors/appointment-already-finished-error'
import { AppointmentNotFoundError } from '../errors/appointment-not-found-error'

interface FinishAppointmentRequest {
  appointmentId: string
  description: string
}

export class FinishAppointmentUseCase {
  constructor(private appointmentsRepository: AppointmentsRepository) {}

  async execute({ appointmentId, description }: FinishAppointmentRequest) {
    const appointment =
      await this.appointmentsRepository.findById(appointmentId)

    if (!appointment) {
      throw new AppointmentNotFoundError()
    }

    if (appointment.current === false) {
      throw new AppointmentAlreadyFinishedError()
    }

    const updatedAppointment = await this.appointmentsRepository.save({
      ...appointment,
      current: false,
      endDate: new Date(),
      description,
    })

    return { updatedAppointment }
  }
}
