import React from 'react'
import { Router } from 'react-router-dom'
import faker from 'faker'
import { cleanup, fireEvent, render, RenderResult, waitFor } from '@testing-library/react'
import 'jest-localstorage-mock'

import Login from './login'
import { AuthenticationSpy, ValidationStub } from '@/presentation/test'
// import { InvalidCredentialsError } from '@/domain/errors'
import { FormContextLayer } from '@/presentation/contexts/form/form-context'
import { createMemoryHistory } from 'history'

type SutTypes = {
  sut: RenderResult
  authenticationSpy: AuthenticationSpy
}

type SutParams = {
  validationError: string
}

const history = createMemoryHistory({ initialEntries: ['/login'] })

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  const authenticationSpy = new AuthenticationSpy()
  validationStub.errorMessage = params?.validationError
  const sut = render(
    <Router location={history.location} navigator={history}>
      <FormContextLayer>
        <Login validation={validationStub} authentication={authenticationSpy} />
      </FormContextLayer>
    </Router>
  )
  return { sut, authenticationSpy }
}

const simulateValidSubmit = async (sut: RenderResult, email = faker.internet.email(), password = faker.internet.password()): Promise<void> => {
  populateEmailField(sut, email)
  populatePasswordField(sut, password)
  const form = sut.getByTestId('form')
  fireEvent.submit(form)
  await waitFor(() => form)
}

const populateEmailField = (sut: RenderResult, email = faker.internet.email()): void => {
  const emailInput = sut.getByTestId('email')
  fireEvent.input(emailInput, { target: { value: email } })
}

const populatePasswordField = (sut: RenderResult, password = faker.internet.password()): void => {
  const passwordInput = sut.getByTestId('password')
  fireEvent.input(passwordInput, { target: { value: password } })
}

const testeStatusForField = (sut: RenderResult, fieldName: 'email' | 'password', validationError?: string): void => {
  const fieldStatus = sut.getByTestId(`${fieldName}-status`)
  expect(fieldStatus.title).toBe(validationError || 'Tudo certo!')
  expect(fieldStatus.textContent).toBe(validationError ? '🟠' : '🟢')
}

const testButtonIsDisabled = (sut: RenderResult, fieldName: string, isDisabled: boolean): void => {
  const button = sut.getByTestId(fieldName) as HTMLButtonElement
  expect(button.disabled).toBe(isDisabled)
}

describe('Login component', () => {
  // Ensure tha updates in tests don´t affect other tests
  afterEach(cleanup)
  beforeEach(() => localStorage.clear())

  test('Should start with initial state', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })

    const errorWrap = sut.getByTestId('error-wrap')
    expect(errorWrap.childElementCount).toBe(0)
    testButtonIsDisabled(sut, 'submit', true)
    testeStatusForField(sut, 'email', validationError)
    testeStatusForField(sut, 'password', validationError)
  })

  test('Should show valid email if valiation succeeds', () => {
    const { sut } = makeSut()
    populateEmailField(sut)
    testeStatusForField(sut, 'email')
  })

  test('Should show valid password if valiation succeeds', () => {
    const { sut } = makeSut()
    populatePasswordField(sut)
    testeStatusForField(sut, 'password')
  })

  test('Should enable submit button if form is valid', () => {
    const { sut } = makeSut()
    populateEmailField(sut)
    populatePasswordField(sut)
    testButtonIsDisabled(sut, 'submit', false)
  })

  test('Should show spinner on submit', async () => {
    const { sut } = makeSut()
    await simulateValidSubmit(sut)
    const spinner = sut.getByTestId('spinner')
    expect(spinner).toBeTruthy()
  })

  test('Should call Authentication with correct values', async () => {
    const { sut, authenticationSpy } = makeSut()
    const email = faker.internet.email()
    const password = faker.internet.password()
    await simulateValidSubmit(sut, email, password)
    expect(authenticationSpy.params).toEqual({ email, password })
  })

  test('Should call Authentication only once', async () => {
    const { sut, authenticationSpy } = makeSut()
    await simulateValidSubmit(sut)
    await simulateValidSubmit(sut)
    expect(authenticationSpy.callsCount).toBe(1)
  })

  test('Should not call Authentication if form is invalid', async () => {
    const validationError = faker.random.words()
    const { sut, authenticationSpy } = makeSut({ validationError })
    await simulateValidSubmit(sut)
    expect(authenticationSpy.callsCount).toBe(0)
  })

  // test('Should present error if Authentication fails', async () => {
  //   const { sut, authenticationSpy } = makeSut()
  //   const error = new InvalidCredentialsError()
  //   jest.spyOn(authenticationSpy, 'auth').mockReturnValueOnce(Promise.reject(error))
  //   simulateValidSubmit(sut)
  //   const errorWrap = sut.getByTestId('error-wrap')
  //   expect(errorWrap.childElementCount).toBe(1)
  //   const mainError = sut.getByTestId('main-error')
  //   expect(mainError?.textContent).toBe(error.message)
  // })

  test('Should add accessToken to localstorage on success', async () => {
    const { sut, authenticationSpy } = makeSut()
    await simulateValidSubmit(sut)
    expect(localStorage.setItem).toHaveBeenCalledWith('accessToken', authenticationSpy.account.accessToken)
    expect(history.location.pathname).toBe('/')
  })

  test('Should go to singup page', () => {
    const { sut } = makeSut()
    const signup = sut.getByTestId('signup')
    fireEvent.click(signup)
    expect(history.location.pathname).toBe('/signup')
  })
})
