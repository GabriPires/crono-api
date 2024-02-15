import { AppointmentsRepository } from '@/repositories/appointment-repository'

interface GetCurrentAppointmentRequest {
  userId: string
}

export class GetCurrentAppointmentUseCase {
  constructor(private appointmentRepository: AppointmentsRepository) {}

  async execute({ userId }: GetCurrentAppointmentRequest) {
    const appointment =
      await this.appointmentRepository.findActiveByUserId(userId)

    return { appointment }
  }
}
