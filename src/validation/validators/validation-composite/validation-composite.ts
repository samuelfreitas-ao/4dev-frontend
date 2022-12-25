import { Validation } from '@/presentation/protocols/validation'
import { FieldValidation } from '@/validation/protocols/field-validation'

export class ValidationComposite implements Validation {
  constructor(private readonly validators: FieldValidation[]) {}

  validate(fieldName: string, value: string): string {
    const validators = this.validators.filter(
      (validator) => validator.field === fieldName
    )
    for (const validator of validators) {
      const error = validator.validate(value)
      if (error) return error.message
    }
    return null
  }
}
