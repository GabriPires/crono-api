export class AlreadyHasActiveAppointment extends Error {
  constructor() {
    super('User already has an active appointment')
  }
}
