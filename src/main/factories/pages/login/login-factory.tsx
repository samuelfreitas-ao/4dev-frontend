import React from 'react'
import { Login } from '@/presentation/pages'
import { FormContextLayer } from '@/presentation/contexts/form/form-context'
import { makeRemoteAuthentication } from '@/main/usecases/authentication/remote-authentication-factory'
import { makeLoginValidation } from './login-validation.factory'

export const makeLogin: React.FC = () => {
  return (
    <FormContextLayer>
      <Login
        authentication={makeRemoteAuthentication()}
        validation={makeLoginValidation()}
      />
    </FormContextLayer>
  )
}
