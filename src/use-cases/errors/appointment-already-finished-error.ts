export class AppointmentAlreadyFinishedError extends Error {
  constructor() {
    super('Appointment already finished.')
  }
}
