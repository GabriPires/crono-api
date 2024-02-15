import { InMemoryAppointmentsRepository } from '@/repositories/in-memory/in-memory-appointments-repository'

import { GetCurrentAppointmentUseCase } from './get-current-appointment'

let appointmentsRepository: InMemoryAppointmentsRepository
let sut: GetCurrentAppointmentUseCase

describe('Get Current Appointment', () => {
  beforeEach(() => {
    appointmentsRepository = new InMemoryAppointmentsRepository()
    sut = new GetCurrentAppointmentUseCase(appointmentsRepository)
  })

  it('should be able to get user current active appointment', async () => {
    appointmentsRepository.create({
      userId: 'user-id',
      projectId: 'project-id',
      description: '',
      current: true,
      startDate: new Date(),
    })

    const { appointment } = await sut.execute({
      userId: 'user-id',
    })

    expect(appointment?.current).toBe(true)
  })

  it('should not be able to get user current active appointment if it does not exists', async () => {
    const { appointment } = await sut.execute({
      userId: 'user-id',
    })

    expect(appointment).toBeNull()
  })
})
