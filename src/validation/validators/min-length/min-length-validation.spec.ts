import { InvalidFieldError } from '@/validation/errors'
import { MinLengthVAlidation } from './min-length-validation'

import faker from 'faker'

const makeSut = (): MinLengthVAlidation =>
  new MinLengthVAlidation(faker.database.column(), 5)

describe('MinLengthVAlidation', () => {
  test('Should return error if value is invalid', () => {
    const sut = makeSut()
    const error = sut.validate(faker.random.alphaNumeric(3))
    expect(error).toEqual(new InvalidFieldError())
  })

  test('Should return falsy if value is valid', () => {
    const sut = makeSut()
    const error = sut.validate(faker.random.alphaNumeric(5))
    expect(error).toBeFalsy()
  })
})
