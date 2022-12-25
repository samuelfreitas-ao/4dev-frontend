import { InvalidFieldError } from '@/validation/errors'
import { MinLengthVAlidation } from './min-length-validation'

describe('MinLengthVAlidation', () => {
  test('Should return error if value is invalid', () => {
    const sut = new MinLengthVAlidation('field', 5)
    const error = sut.validate('123')
    expect(error).toEqual(new InvalidFieldError())
  })

  test('Should return falsy if value is valid', () => {
    const sut = new MinLengthVAlidation('field', 5)
    const error = sut.validate('12345')
    expect(error).toBeFalsy()
  })
})
