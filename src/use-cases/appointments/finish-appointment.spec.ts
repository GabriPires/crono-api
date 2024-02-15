import { InMemoryAppointmentsRepository } from '@/repositories/in-memory/in-memory-appointments-repository'

import { AppointmentAlreadyFinishedError } from '../errors/appointment-already-finished-error'
import { AppointmentNotFoundError } from '../errors/appointment-not-found-error'
import { FinishAppointmentUseCase } from './finish-appointment'

let appointmentsRepository: InMemoryAppointmentsRepository
let sut: FinishAppointmentUseCase

describe('Finish Appointments', () => {
  beforeEach(() => {
    appointmentsRepository = new InMemoryAppointmentsRepository()
    sut = new FinishAppointmentUseCase(appointmentsRepository)
  })

  it('should be able to finish an appointment', async () => {
    const appointment = await appointmentsRepository.create({
      userId: 'user-id',
      projectId: 'project-id',
      current: true,
      startDate: new Date(),
      description: '',
    })

    const updatedAppointment = await sut.execute({
      appointmentId: appointment.id,
      description: 'description',
    })

    expect(updatedAppointment.current).toBe(false)
    expect(updatedAppointment.endDate).not.toBeNull()
  })

  it('should not be able to finish an appointment that does not exist', async () => {
    const promise = sut.execute({
      appointmentId: 'non-existing-id',
      description: 'description',
    })

    await expect(promise).rejects.toBeInstanceOf(AppointmentNotFoundError)
  })

  it('should not be able to finish an appointment that is already finished', async () => {
    const appointment = await appointmentsRepository.create({
      userId: 'user-id',
      projectId: 'project-id',
      current: false,
      startDate: new Date(),
      description: '',
    })

    const promise = sut.execute({
      appointmentId: appointment.id,
      description: 'description',
    })

    await expect(promise).rejects.toBeInstanceOf(
      AppointmentAlreadyFinishedError,
    )
  })
})
