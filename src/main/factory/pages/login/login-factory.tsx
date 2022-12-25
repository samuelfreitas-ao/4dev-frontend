import React from 'react'
import { Login } from '@/presentation/pages'
import { RemoteAuthentication } from '@/data/usecases/authentication/remote-authentication'
import { AxiosHttpClient } from '@/infra/http/axios-http/axios-http-client'
import { ValidationBuilder, ValidationComposite } from '@/validation/validators'
import { FormContextLayer } from '@/presentation/contexts/form/form-context'

export const makeLogin: React.FC = () => {
  const url = 'http://fordevs.herokuapp.com/api/login'
  const axioHttpClient = new AxiosHttpClient()
  const remoteAuthentication = new RemoteAuthentication(url, axioHttpClient)
  const validationComposite = ValidationComposite.build([
    ...ValidationBuilder.field('email').required().email().build(),
    ...ValidationBuilder.field('password').required().min(5).build()
  ])

  return (
    <FormContextLayer>
      <Login
        authentication={remoteAuthentication}
        validation={validationComposite}
      />
    </FormContextLayer>
  )
}
