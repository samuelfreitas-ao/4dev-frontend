import {
  EmailValidation,
  MinLengthVAlidation,
  RequiredFieldValidation,
  ValidationBuilder,
} from '@/validation/validators'

describe('ValidationBuilder', () => {
  test('Should return RequiredFieldValidation', () => {
    const validations = ValidationBuilder.field('field').required().build()
    expect(validations).toEqual([new RequiredFieldValidation('field')])
  })

  test('Should return EmailValidation', () => {
    const validations = ValidationBuilder.field('field').email().build()
    expect(validations).toEqual([new EmailValidation('field')])
  })

  test('Should return MinLengthVAlidation', () => {
    const validations = ValidationBuilder.field('field').min(5).build()
    expect(validations).toEqual([new MinLengthVAlidation('field', 5)])
  })
})
