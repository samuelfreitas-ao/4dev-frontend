import { FieldValidationSpy } from '@/validation/validators/test'
import { ValidationComposite } from './validation-composite'

describe('ValidationComposite', () => {
  test('Should return error if any validations fails', () => {
    const fieldValidationSpy1 = new FieldValidationSpy('field')
    const fieldValidationSpy2 = new FieldValidationSpy('field')
    fieldValidationSpy2.error = new Error('any_error')
    const sut = new ValidationComposite([
      fieldValidationSpy1,
      fieldValidationSpy2,
    ])
    const error = sut.validate('field', 'value')
    expect(error).toBe('any_error')
  })
})
