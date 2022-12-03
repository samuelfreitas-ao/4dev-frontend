import { Validation } from '@/presentation/protocols/validation'

export class ValidationSpy implements Validation {
  errorMessage: string
  input: Object

  validate(input: Object): string {
    this.input = input

    return this.errorMessage
  }
}
