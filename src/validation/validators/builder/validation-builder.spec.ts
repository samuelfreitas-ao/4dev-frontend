import {
  EmailValidation,
  MinLengthVAlidation,
  RequiredFieldValidation,
  ValidationBuilder,
} from '@/validation/validators'

import faker from 'faker'

describe('ValidationBuilder', () => {
  test('Should return RequiredFieldValidation', () => {
    const field = faker.database.column()
    const validations = ValidationBuilder.field(field).required().build()
    expect(validations).toEqual([new RequiredFieldValidation(field)])
  })

  test('Should return EmailValidation', () => {
    const field = faker.database.column()
    const validations = ValidationBuilder.field(field).email().build()
    expect(validations).toEqual([new EmailValidation(field)])
  })

  test('Should return MinLengthVAlidation', () => {
    const field = faker.database.column()
    const length = faker.datatype.number()
    const validations = ValidationBuilder.field(field).min(length).build()
    expect(validations).toEqual([new MinLengthVAlidation(field, length)])
  })

  test('Should return a list of validations', () => {
    const field = faker.database.column()
    const length = faker.datatype.number()
    const validations = ValidationBuilder.field(field)
      .required()
      .email()
      .min(length)
      .build()
    expect(validations).toEqual([
      new RequiredFieldValidation(field),
      new EmailValidation(field),
      new MinLengthVAlidation(field, length),
    ])
  })
})
