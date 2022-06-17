export class ExistingPartnerError extends Error {
  public readonly name = 'ExistingPartnerError'
  constructor () {
    super('Partner already has with the same id.')
  }
}